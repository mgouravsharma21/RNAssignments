


import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = '1478cfa469c74c1fa1210d7cd1876d1d';
const PAGE_SIZE = 10;
const CACHE_KEY = 'news_articles_cache';

const fetchArticles = async (page: number) => {
  const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch articles');
  const data = await response.json();
  return data.articles || [];
};

const NewsReaderApp: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);


  // Only fetch from network if no cache or on refresh
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          if (isMounted) setArticles(JSON.parse(cached));
        } else {
          // No cache, fetch from network
          const newArticles = await fetchArticles(1);
          if (isMounted) {
            setArticles(newArticles);
            setHasMore(newArticles.length === PAGE_SIZE);
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newArticles));
          }
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Error fetching articles');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);


  // Stable ref for articles to avoid stale closure
  const articlesRef = useRef<any[]>(articles);
  useEffect(() => { articlesRef.current = articles; }, [articles]);

  const loadArticles = useCallback(async (pageToLoad: number, initial = false) => {
    if (initial) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const newArticles = await fetchArticles(pageToLoad);
      let updatedArticles = initial ? newArticles : [...articlesRef.current, ...newArticles];
      setArticles(updatedArticles);
      setHasMore(newArticles.length === PAGE_SIZE);
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(updatedArticles));
    } catch (err: any) {
      setError(err.message || 'Error fetching articles');
    } finally {
      if (initial) setRefreshing(false);
      else setLoading(false);
    }
  }, []);


  const handleRefresh = async () => {
    setPage(1);
    await loadArticles(1, true);
  };


  const handleLoadMore = async () => {
    if (!hasMore || loading || refreshing) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await loadArticles(nextPage);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error && !refreshing && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={articles}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListFooterComponent={loading && !refreshing ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  card: { backgroundColor: '#f9f9f9', marginBottom: 10, padding: 15, borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  desc: { color: '#555' },
  errorBox: { backgroundColor: '#fee', padding: 10, borderRadius: 8, marginBottom: 10 },
  errorText: { color: '#c00', marginBottom: 5 },
  retryBtn: { alignSelf: 'flex-start', backgroundColor: '#c00', padding: 6, borderRadius: 4 },
  retryText: { color: '#fff' },
});

export default NewsReaderApp;