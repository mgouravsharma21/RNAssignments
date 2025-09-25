
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';

export default function SecureLogin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
  },
});