import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../components/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const { login } = useAuth();

  const handleLoginAction = async () => {
    try {
      const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'reqres-free-v1'
                },
                body: JSON.stringify({ email, password })
            });

            console.log(response);
      const data = await response.json();
      if (response.ok) {
        login(data.token); 
      } else {
        Alert.alert('Login failed', data.error || 'Invalid credentials');
      }
    } catch (err) {
      Alert.alert('Network error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLoginAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
});