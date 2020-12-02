import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainLoadingScreen from './components/views/MainLoadingScreen';
import MainScreen from './components/views/MainScreen';


const Stack = createStackNavigator();
const App = () => {
  let initialScreenName = "MainScreen"
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainLoadingScreen">
        {/* Route 01) MainLoading Screen*/}
        <Stack.Screen name="MainLoadingScreen"
          component={MainLoadingScreen}
          options={{ headerShown: false }}
          initialParams={{ initialScreenName }}
        />
        {/* Route 02) Main Screen*/}
        <Stack.Screen name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;