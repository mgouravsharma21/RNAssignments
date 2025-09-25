// Importing necessary hooks and components from React and React Native
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';

interface Product {
  id: number;
  title: string;
  price: number;
}

type Category = string | {
  name: string;
  slug: string;
  url: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]); // Product list
  const [categories, setCategories] = useState<Category[]>([]); // Available categories
  const [category, setCategory] = useState<string>(''); // Selected category
  const [searchQuery, setSearchQuery] = useState<string>(''); // Current search input
  const [skip, setSkip] = useState<number>(0); // Pagination skip count
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [hasMore, setHasMore] = useState<boolean>(true); //  more products 

  const LIMIT = 10;

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products/categories'); 
      const data = await res.json(); 
      setCategories(data); 
    } catch (error) {
      console.error('Fail to fetch categories:', error);
    }
  };

  const buildProductURL = (
    baseURL: string,
    skip: number,
    limit: number,
    searchQuery: string,
    category: string
  ): string => {
    let endpoint = baseURL; 
    let query = `?limit=${limit}&skip=${skip}`; 

    if (searchQuery) {
      endpoint += `/search`; 
      query += `&q=${encodeURIComponent(searchQuery)}`; 
    } else if (category) {
      endpoint += `/category/${encodeURIComponent(category)}`; 
    }

    return `${endpoint}${query}`;
  };

  const fetchProducts = async (reset = false) => {
    if (isLoading || (!hasMore && !reset)) return;

    setIsLoading(true);

    const baseURL = 'https://dummyjson.com/products'; 
    const currentSkip = reset ? 0 : skip; // 
    const fullURL = buildProductURL(baseURL, currentSkip, LIMIT, searchQuery, category); 

    try {
      const res = await fetch(fullURL); 
      const data = await res.json(); 
      const newProducts: Product[] = data.products || []; 

      if (reset) {
        setProducts(newProducts); 
        setSkip(LIMIT); 
        setHasMore(newProducts.length === LIMIT);
      } else {
        setProducts((prev) => [...prev, ...newProducts]); // Append new products
        setSkip((prev) => prev + LIMIT);
        setHasMore(newProducts.length === LIMIT); 
      }
    } catch (error) {
      console.error('Error fetching products:', error); 
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(true); 
  }, []);

  useEffect(() => {
    fetchProducts(true); 
  }, [searchQuery, category]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchProducts(); 
    }
  };

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.productCard}>
      <Text style={styles.title}>{item.title || 'No title'}</Text>
      <Text style={styles.price}>${item.price ?? 'N/A'}</Text>
    </View>
  );

  const renderCategory: ListRenderItem<Category> = ({ item }) => {
    const label = typeof item === 'string' ? item : item.name; 
    const value = typeof item === 'string' ? item : item.slug; 

    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          category === value && styles.activeCategory, 
        ]}
        onPress={() => setCategory(category === value ? '' : value)} 
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.categoryText,
            category === value && styles.activeCategoryText, 
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

 
  return (
    <View style={styles.container}>
     
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery} 
      />

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item: { slug: any; }, index: { toString: () => any; }) =>
          typeof item === 'string' ? item : item.slug ?? index.toString()
        }
        renderItem={renderCategory}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 60 }} 
      />

      <FlatList
        data={products}
        keyExtractor={(item: { id: { toString: () => any; }; }) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2} 
        contentContainerStyle={styles.list}
        onEndReached={handleLoadMore} 
        onEndReachedThreshold={0.5} 
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#000" /> : null}
        initialNumToRender={10}
        removeClippedSubviews
        getItemLayout={(_: any, index: number) => ({
          length: 180,
          offset: 180 * index,
          index,
        })} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f5f5f5', 
  },
  input: {
    backgroundColor: '#fff',
    
    padding: 10,
    margin: 10,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 8,

    shadowColor: '#000',
    shadowOpacity: 0.05,

    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    fontSize: 12,
    color: '#888',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,

    backgroundColor: '#ddd',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
    height: 36, 
  },
  activeCategory: {
    backgroundColor: '#4a90e2', 
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  activeCategoryText: {
    color: '#fff',
  },
});