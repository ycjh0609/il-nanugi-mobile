import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "./src/app/containers/LoginScreen";
import MainTabNavigation from "./src/app/navigation/MainTabNavigation";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon 
 * Description : App
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
* 02) Static Variables
*----------------------------------------------------------------------------------*/
const AppStack = createStackNavigator();
const INITINIAL_ROUTE_NAME = "LoginScreen";


/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/

const App = () => {
  /*-------------------------------------------------------------------------------
  * 03-1) Hooks
  *-------------------------------------------------------------------------------*/
  const [initialScreenName,setInitialScreenName] = useState("MainTabNavigation");

  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName={INITINIAL_ROUTE_NAME}>
        
        {/* Route 01) LoginScreen*/}
        <AppStack.Screen name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
          initialParams={{ initialScreenName }}
        />

        {/* Route 03) For New Home Screen */}
        <AppStack.Screen name="MainTabNavigation"
          component={MainTabNavigation}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>



    </NavigationContainer>
  );
}
export default App;