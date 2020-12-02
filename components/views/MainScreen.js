import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import globalConfig from '../../common/config/globalConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import GroupScreen from './GroupScreen';
import SettingScreen from './SettingScreen';
import NotificationScreen from './NotificationScreen';
import ChatScreen from './ChatScreen';
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({

});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Others ***************************************************************************************************************/

const Tab = createBottomTabNavigator();
const getTabIconName = (routeName, focused) => {
    let iconName;
    if (routeName === "HomeScreen") {
        iconName = focused ? 'ios-person-add' : 'ios-person';
    } else if (routeName === "ChatScreen") {
        iconName = focused ? 'ios-chatboxes' : 'ios-chatboxes';
    } else if (routeName === "GroupScreen") {
        iconName = focused ? 'md-cube' : 'md-cube';
    } else if (routeName === "NotificationScreen") {
        iconName = focused ? "ios-notifications" : "ios-notifications-outline";
    } else if (routeName === "SettingScreen") {
        iconName = focused ? 'ios-list-box' : 'ios-list';
    }
    return iconName;
}
/* 02) End Others ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const MainScreen = ({ route, navigation }) => {

    useEffect(() => {

    }, []);

    /* 03-1) Start View ***************************************************************************************************************/
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = getTabIconName(route.name, focused);
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#2e2d2b',
                inactiveTintColor: '#c9c7c1',
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarBadge: 3, title: '' }} />
            <Tab.Screen name="GroupScreen" component={GroupScreen} options={{ tabBarBadge: undefined, title: '' }} />
            {/* <Tab.Screen name="NotificationScreen" component={NotificationScreen} options={{ tabBarBadge: undefined, title: '' }} /> */}
            <Tab.Screen name="ChatScreen" component={ChatScreen} options={{ tabBarBadge: 2, title: '' }} />
            <Tab.Screen name="SettingScreen" component={SettingScreen} options={{ tabBarBadge: undefined, title: '' }} />
        </Tab.Navigator>
    )
    /* 03-1) End View ***************************************************************************************************************/
}
/* 03) End View ***************************************************************************************************************/
export default MainScreen;