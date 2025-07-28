import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import useFetch from './UseFetch.hook';
import User from './User.prop';
import styles from '../stylesheet/StyleSheet';

// Component that uses the hook
const UserList: React.FC = () => {
  const { loading, data, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No users found.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default UserList;
