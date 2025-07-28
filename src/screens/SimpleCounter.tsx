import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const SimpleCounterApp: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Click below icons to see change</Text>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="-" onPress={() => setCount(count - 1)} />
        <Button title="+" onPress={() => setCount(count + 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  counter: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default SimpleCounterApp;
