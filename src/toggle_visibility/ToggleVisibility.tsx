import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import styles from '../stylesheet/StyleSheet';


const ToggleVisibility: React.FC = () => {
    const [isVisible, setVisibility] = useState(true);

    const handleToggle = () => {
        setVisibility(prev => !prev);
    };

    return (
        <View style={styles.rootLayout}>
            <Switch style={styles.toggleSwitch}
                value={isVisible}
                onValueChange={setVisibility}
            />
            {isVisible ? <Text style={styles.toggleTextTitle}>Above is a switch button. toggle that button to show hide me.</Text> : null}

        </View>
    );
}

export default ToggleVisibility;