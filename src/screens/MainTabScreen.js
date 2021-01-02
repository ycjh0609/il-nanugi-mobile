import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import CenterTabBtn from '../components/main-tab/CenterTapBtn';
import GroupScreen from './GroupScreen';
import HomeNavigatorScreen from './HomeNavigatorScreen';
import SettingScreen from './SettingScreen';
import TaskScreen from './TaskScreen';

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
const BottomTab = createBottomTabNavigator();
const INITINIAL_ROUTE_NAME = "Home"

function getTabIconName(routeName, focused) {
    let iconName;
    if (routeName === "Home") {
        iconName = focused ? 'ios-home' : 'ios-home';
    } else if (routeName === "Task") {
        iconName = focused ? 'ios-chatboxes' : 'ios-chatboxes';
    } else if (routeName === "Group") {
        iconName = focused ? 'md-calendar' : 'md-calendar';
    } else if (routeName === "Setting") {
        iconName = focused ? 'ios-list-box' : 'ios-list';
    }
    return iconName;
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const MainScreen = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <BottomTab.Navigator
            initialRouteName={INITINIAL_ROUTE_NAME}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = getTabIconName(route.name, focused);
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: "#0c5063",
                inactiveTintColor: '#c9c7c1',
            }} >
            <BottomTab.Screen name="Home" component={HomeNavigatorScreen}
                options={{
                    tabBarLabel: '',
                }}
            />
            <BottomTab.Screen name="Group" component={GroupScreen}
                options={{
                    tabBarLabel: '',
                }}
            />
            <BottomTab.Screen name="ilPlus" component={HomeNavigatorScreen}
                options={{
                    tabBarLabel: '',
                    tabBarButton: (props) => <CenterTabBtn {...props} />
                }}
            />
            <BottomTab.Screen name="Task" component={TaskScreen}
                options={{
                    tabBarLabel: '',
                    tabBarBadge: 3,
                }}
            />
            <BottomTab.Screen name="Setting" component={SettingScreen}
                options={{
                    tabBarLabel: '',
                }}
            />
        </BottomTab.Navigator>
    );
}
export default MainScreen;