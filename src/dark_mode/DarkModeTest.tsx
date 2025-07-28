import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import styles from '../stylesheet/StyleSheet';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleSwitch = () => setIsDarkMode(prev => !prev);

  const containerStyle = isDarkMode
    ? [styles.container, styles.darkBackground]
    : [styles.container, styles.lightBackground];

  const textStyle = isDarkMode ? styles.darkText : styles.lightText;

  return (
    <View style={containerStyle}>
      <Text style={[styles.title, textStyle]}>
        {isDarkMode ? 'Dark Mode is ON' : 'Light Mode is ON'}
      </Text>

      <Switch
        value={isDarkMode}
        onValueChange={toggleSwitch}
        thumbColor={isDarkMode ? '#fff' : '#000'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />
    </View>
  );
};

export default DarkModeToggle;
