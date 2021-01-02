import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainLoginScreen from './src/screens/MainLoginScreen';
import MainTabScreen from "./src/screens/MainTabScreen";
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon 
 * Description : App
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
* 02) Static Variables
*----------------------------------------------------------------------------------*/
const Stack = createStackNavigator();
const INITINIAL_ROUTE_NAME = "MainLoginScreen";
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const App = () => {
  /*-------------------------------------------------------------------------------
  * 03-1) Hooks
  *-------------------------------------------------------------------------------*/
  const [initialScreenName,setInitialScreenName] = useState("MainTabScreen");


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