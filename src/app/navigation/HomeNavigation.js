import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/Ionicons";
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ToDoListScreen from '../containers/ToDoListScreen';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon 
 * Description : Honme Stack Screen
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    commonHeaderStyle: {
        height: 240
    },
    commonHeaderTitleStyle: {
        fontSize: 20
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const HomeStack = createStackNavigator();
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const HomeNavigation = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [currentScreen, setCurrenScreen] = useState("ToDoListScreen");

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <HomeStack.Navigator initialRouteName={currentScreen}>
            <HomeStack.Screen name="ToDoListScreen" component={ToDoListScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    )
}
export default HomeNavigation;