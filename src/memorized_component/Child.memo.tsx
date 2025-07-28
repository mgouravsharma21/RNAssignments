import { memo } from "react";
import ChildProps from "./Child.props";
import { Text, View } from "react-native";
import styles from "../stylesheet/StyleSheet";

const Child = memo<ChildProps>(({ text }) => {
  console.log('Child re-rendered');
  return (
    <View style={styles.childContainer}>
      <Text style={styles.childText}>Child received: {text}</Text>
    </View>
  );
});

export default Child;