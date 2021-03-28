import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import CenterTabBtn from "../components/main-navigation/CenterTapBtn";
import ChatScreen from '../containers/ChatScreen';
import GroupScreen from '../containers/GroupScreen';
import SettingScreen from '../containers/SettingScreen';
import commonStyle from '../styles/commonStyle';
import GroupNavigation from './GroupNavigation';
import HomeStackNavigation from './HomeStackNavigation';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon 
 * Description : Main Tab
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const MainTab = createBottomTabNavigator();
const INITINIAL_ROUTE_NAME = "Home"

function getTabIconName(routeName, focused) {
    let iconName;
    if (routeName === "Home") {
        iconName = focused ? 'ios-home' : 'ios-home';
    } else if (routeName === "Chat") {
        iconName = focused ? 'ios-chatboxes' : 'ios-chatboxes';
    } else if (routeName === "Group") {
        iconName = focused ? 'md-people' : 'md-people';
    } else if (routeName === "Setting") {
        iconName = focused ? 'ios-list-box' : 'ios-list';
    }
    return iconName;
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const Blank = () => <View></View>;
const MainTabNavigation = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <MainTab.Navigator
            initialRouteName={INITINIAL_ROUTE_NAME}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = getTabIconName(route.name, focused);
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: commonStyle.oneTextColor,
                inactiveTintColor: '#c9c7c1',
            }} >

            <MainTab.Screen name="Home" component={HomeStackNavigation}
                options={{
                    tabBarLabel: '',
                }}
                initialParams={route.params}
            />
            <MainTab.Screen name="Group" component={GroupNavigation}
                options={{
                    tabBarLabel: '',
                }}
                initialParams={route.params}
            />
            <MainTab.Screen name="ilPlus" component={Blank}
                options={{
                    tabBarLabel: '',
                    tabBarButton: (props) => <CenterTabBtn {...props} navigation={navigation}  />
                }}
            />
            <MainTab.Screen name="Chat" component={ChatScreen}
                options={{
                    tabBarLabel: '',
                    tabBarBadge: 3,
                }}
            />
            <MainTab.Screen name="Setting" component={SettingScreen}
                options={{
                    tabBarLabel: '',
                }}
            />
        </MainTab.Navigator>
    );
}
export default MainTabNavigation;