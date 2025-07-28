import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from "../stylesheet/StyleSheet";
import GreetingItem from './GreetingItem';

const GreetingCard: React.FC = () => {

const greetingList = [
    { name: "John", message: "Happy Birthday!" },
    { name: "Jane", message: "Congratulations on your new job!" },
    { name: "Doe", message: "Wishing you a wonderful day!" }
];

  return (
    <ScrollView style={styles.rootLayout}>
        {greetingList.map((item, index) => (
            <GreetingItem key={index} name={item.name} message={item.message} />
        ))}
    </ScrollView>
  );
};

export default GreetingCard;
