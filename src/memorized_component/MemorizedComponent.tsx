import React, { useState, memo } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ChildProps from './Child.props';
import styles from '../stylesheet/StyleSheet';
import Child from './Child.memo';

const MemoizedComponent: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [text, setText] = useState<string>('');

  return (
    <View style={styles.memorizedComponentContainer}>
      <Text style={styles.title}>React memo Example</Text>

      <TextInput
        style={styles.memorizedComponentInput}
        placeholder="Type something..."
        value={text}
        onChangeText={setText}
      />

      <Button title="Increment Counter" onPress={() => setCounter(prev => prev + 1)} />
      <Text style={styles.counterText}>Counter: {counter}</Text>

      <Child text={text} />
    </View>
  );
};

export default MemoizedComponent;
