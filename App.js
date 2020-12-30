import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainLoginScreen from './src/screens/MainLoginScreen';
import MainTabScreen from "./src/screens/MainTabScreen";

const Stack = createStackNavigator();

const App = () => {

  const INITINIAL_ROUTE_NAME = "MainLoginScreen";
  let initialScreenName = "MainTabScreen";
  
  useEffect(()=>{
    
  })
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={INITINIAL_ROUTE_NAME}>
        {/* Route 01) MainLoginScreen*/}
        <Stack.Screen name="MainLoginScreen"
          component={MainLoginScreen}
          options={{ headerShown: false }}
          initialParams={{ initialScreenName }}
        />
  

        {/* Route 03) For New Home Screen */}
        <Stack.Screen name="MainTabScreen"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;