import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AssignmentList from '../screens/AssignmentList';
import SimpleCounterApp from '../screens/SimpleCounter';
import GreetingCard from '../screens/GreetingCard';
import ToggleVisibility from '../screens/ToggleVisibility';
import TimerComponent from '../screens/Timer';
import InputForm from '../screens/InputForm';
import TodoList from '../screens/TodoList';
import ResponsiveCardGrid from '../screens/ResponsiveCardGrid';
import MemoizedComponent from '../screens/MemorizedComponent';
import UserList from '../screens/UserList';
import DarkModeToggle from '../screens/DarkModeTest';

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

