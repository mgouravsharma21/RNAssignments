import { Text, View } from "react-native";
import styles from "../styles/StyleSheet";
import GreetingItemProps from "../props/GreetingItem.props";

const GreetingItem = (props: GreetingItemProps) => {
    return (
        <View style={styles.greetingItemContainer}>
            <Text style={styles.assignmentItemText}>{props.name}</Text>
            <Text style={styles.assignmentItemText}>{props.message}</Text>
        </View>
    );
}

export default GreetingItem;
