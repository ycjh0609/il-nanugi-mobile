import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/home/Home';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon 
 * Description : Honme Stack Screen
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const HomeStack = createStackNavigator();
const INITINIAL_ROUTE_NAME = "Home";
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const HomeStackScreen = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    useEffect(() => {

    }, []);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <HomeStack.Navigator initialRouteName={INITINIAL_ROUTE_NAME}>
            <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
    )
}
export default HomeStackScreen;