import { Text, View } from "react-native";
import styles from "../styles/StyleSheet";
import { useEffect, useState } from "react";

const TimerComponent: React.FC = () => {

    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        // Start timer on mount
        const interval = setInterval(() => {
            setSecondsElapsed(prev => prev + 1);
        }, 1000);

        // Clean up timer on unmount
        return () => clearInterval(interval);
    }, []);


    return (
        <View style={styles.rootLayout}>
            <Text style={styles.timerText}>
                Elapsed Time: {secondsElapsed} second{secondsElapsed !== 1 ? 's' : ''}
            </Text>
        </View>
    )
}

export default TimerComponent;