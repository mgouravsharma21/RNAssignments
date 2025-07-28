import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import styles from "../styles/StyleSheet";
import { AssignmentItem } from "../components/AssignmentItem";
import { RootStackParamList } from "../nav/App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const assignments = ["Simple Counter App", "Greeting Screen", "Toggle Text Visibility", "Timer Component",
  "Input Form", "TODO List", "Responsive Card Grid", "Memoized Component", "Fetch User List",
  "Dark Mode Test"
]

type AssignmentListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AssignmentList'>;

const AssignmentList: React.FC = () => {
  const navigation = useNavigation<AssignmentListNavigationProp>();

  return (
    <SafeAreaView style={styles.rootLayout}>
      <Text style={styles.assignmentHeaderText}>Choose an assignment below to demo</Text>
      <FlatList
        data={assignments}
        renderItem={({ item, index }) => <AssignmentItem name={item} onPress={() => {
          switch (index) {
            case 0:
              navigation.navigate('SimpleCounterApp');
              break;
            case 1:
              navigation.navigate('GreetingCard');
              break;
            case 2:
              navigation.navigate('ToggleVisibility');
              break;
            case 3:
              navigation.navigate('TimerComponent');
              break;
            case 4:
              navigation.navigate('InputForm');
              break;
            case 5:
              navigation.navigate('TODOList');
              break;
            case 6:
              navigation.navigate('ResponsiveCardGrid');
              break;
            case 7:
              navigation.navigate('MemoizedComponent');
              break;
            case 8:
              navigation.navigate('UserList');
              break;
            case 9:
              navigation.navigate('DarkModeToggle');
              break;  
          }
        }} />}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

export default AssignmentList;
