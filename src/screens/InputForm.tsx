import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import styles from '../styles/StyleSheet';

const InputForm: React.FC = () => {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = () => {
    setSubmittedName(name.trim());
  };

  return (
    <View style={styles.rootLayout}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName} // Controlled input
      />

      <Button title="Submit" onPress={handleSubmit} />

      {submittedName.length > 0 && (
        <Text style={styles.greeting}>Hello, {submittedName}!</Text>
      )}
    </View>
  );
};

export default InputForm;
