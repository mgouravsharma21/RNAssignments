import { Text, View } from "react-native";
import styles from "../stylesheet/StyleSheet";
import GreetingItemProps from "./GreetingItem.prop";


const GreetingItem = (props: GreetingItemProps) => {
    return (
        <View style={styles.greetingItemContainer}>
            <Text style={styles.assignmentItemText}>{props.name}</Text>
            <Text style={styles.assignmentItemText}>{props.message}</Text>
        </View>
    );
}

export default GreetingItem;
