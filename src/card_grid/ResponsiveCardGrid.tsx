import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import Card from './Card.prop';
import styles from '../stylesheet/StyleSheet';


// Static card data
const cards: Card[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card.' },
  { id: '2', title: 'Card 2', description: 'This is the second card.' },
  { id: '3', title: 'Card 3', description: 'This is the third card.' },
  { id: '4', title: 'Card 4', description: 'This is the fourth card.' },
  { id: '5', title: 'Card 5', description: 'This is the fifth card.' },
  { id: '6', title: 'Card 6', description: 'This is the sixth card.' },
];

const CARD_MARGIN = 10;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_MARGIN * 4) / 2; // 2 cards per row

const ResponsiveCardGrid: React.FC = () => {
  const renderCard = ({ item }: { item: Card }) => (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.cardGridContainer}>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ResponsiveCardGrid;
