import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainLoginScreen from './src/components/views/MainLoginScreen';
import MainScreen from './src/components/views/MainScreen';

const Stack = createStackNavigator();

const App = () => {

  const INITINIAL_ROUTE_NAME = "MainLoginScreen";
  let initialScreenName = "MainScreen";
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={INITINIAL_ROUTE_NAME}>
        {/* Route 01) MainLoginScreen*/}
        <Stack.Screen name="MainLoginScreen"
          component={MainLoginScreen}
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