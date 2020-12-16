import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import globalConfig from '../../common/config/globalConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import GroupScreen from './GroupScreen';
import SettingScreen from './SettingScreen';
import ChatScreen from './ChatScreen';
import {useStoreState,defineStoreItem,deleteStoreWatcher} from '../../common/utils/store/commonStore';
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({

});
/* 01) End Style ***************************************************************************************************************/


/* 02) Start Static Function Group ******************************************************************************************************/

function getTabIconName(routeName, focused) {
    let iconName;
    if (routeName === "HomeScreen") {
        iconName = focused ? 'ios-home' : 'ios-home';
    } else if (routeName === "ChatScreen") {
        iconName = focused ? 'ios-chatboxes' : 'ios-chatboxes';
    } else if (routeName === "GroupScreen") {
        iconName = focused ? 'md-calendar' : 'md-calendar';
    } else if (routeName === "NotificationScreen") {
        iconName = focused ? "ios-notifications" : "ios-notifications-outline";
    } else if (routeName === "SettingScreen") {
        iconName = focused ? 'ios-list-box' : 'ios-list';
    }
    return iconName;
}
/* 02) End Static Function Group ***************************************************************************************************************/


/* 03) Start View ***************************************************************************************************************/
const MainBottomTab = createBottomTabNavigator();
const MainScreen = ({ route, navigation }) => {
    const initialTabName = route.params.initialTabName; // App.js 에서 넘겨받은 최초 스크린
    
    useEffect(() => {
        
    }, []);

    /* 03-1) Start View ***************************************************************************************************************/
    return (
        <MainBottomTab.Navigator
            initialRouteName={initialTabName}
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
            <MainBottomTab.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarBadge: 3, title: '' }} />
            <MainBottomTab.Screen name="GroupScreen" component={GroupScreen} options={{ tabBarBadge: undefined, title: '' }} />
            {/* <Tab.Screen name="NotificationScreen" component={NotificationScreen} options={{ tabBarBadge: undefined, title: '' }} /> */}
            <MainBottomTab.Screen name="ChatScreen" component={ChatScreen} options={{ tabBarBadge: 2, title: '' }} />
            <MainBottomTab.Screen name="SettingScreen" component={SettingScreen} options={{ tabBarBadge: undefined, title: '' }} />
        </MainBottomTab.Navigator>
    )
    /* 03-1) End View ***************************************************************************************************************/
}
/* 03) End View ***************************************************************************************************************/
export default MainScreen;