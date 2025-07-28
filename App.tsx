/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AssignmentList from './src/assignment_list/AssignmentList';
import SimpleCounterApp from './src/simple_counter/SimpleCounterApp';
import GreetingCard from './src/greeting_card/GreetingCard';
import ToggleVisibility from './src/toggle_visibility/ToggleVisibility';
import TimerComponent from './src/timer/TimerComponent';
import InputForm from './src/input_handling/InputForm';
import TodoList from './src/todo_list/TodoList';
import ResponsiveCardGrid from './src/card_grid/ResponsiveCardGrid';
import MemoizedComponent from './src/memorized_component/MemorizedComponent';
import UserList from './src/user_list/UserList';
import DarkModeToggle from './src/dark_mode/DarkModeTest';

export type RootStackParamList = {
  AssignmentList: undefined,
  SimpleCounterApp: undefined,
  GreetingCard: undefined,
  ToggleVisibility: undefined,
  TimerComponent: undefined,
  InputForm: undefined,
  TODOList: undefined,
  ResponsiveCardGrid: undefined,
  MemoizedComponent: undefined,
  UserList: undefined,
  DarkModeToggle: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AssignmentList"
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen name="AssignmentList" component={AssignmentList} />
          <Stack.Screen name="SimpleCounterApp" component={SimpleCounterApp} />
          <Stack.Screen name="GreetingCard" component={GreetingCard} />
          <Stack.Screen name="ToggleVisibility" component={ToggleVisibility} />
          <Stack.Screen name="TimerComponent" component={TimerComponent} />
          <Stack.Screen name="InputForm" component={InputForm} />
          <Stack.Screen name="TODOList" component={TodoList} />
          <Stack.Screen name="ResponsiveCardGrid" component={ResponsiveCardGrid} />
          <Stack.Screen name="MemoizedComponent" component={MemoizedComponent} />
          <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="DarkModeToggle" component={DarkModeToggle} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

