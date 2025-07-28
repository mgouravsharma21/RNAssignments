import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { AssignmentItemProps } from "./AssignmentItem.props";
import styles from "../stylesheet/StyleSheet";


export const AssignmentItem = ( {name, onPress}: AssignmentItemProps) => {
  return (
    <View style={styles.rootLayout}>
      <TouchableOpacity style={styles.assignmentItem} onPress={onPress}>
      <Text style={styles.assignmentItemText}>{name}</Text>
    </TouchableOpacity>
    </View>
  );
};
