import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/Ionicons";
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ToDoListScreen from '../containers/ToDoListScreen';
import TaskDetailScreen from "../containers/TaskDetailScreen";
import CodeUtil from '../utils/code/CodeUtil';

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
const TaskDetailHeaderOptions = ({ route }) => {
    //https://reactnavigation.org/docs/stack-navigator#navigationoptions-used-by-stacknavigator

    const forFade = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
    const getColorByStatus = (status)=>{
        if (status === CodeUtil.TASK_STATUS.TODO) return CodeUtil.TASK_STATUS_COLOR.TODO;
        if (status === CodeUtil.TASK_STATUS.DOING) return CodeUtil.TASK_STATUS_COLOR.DOING;
        if (status === CodeUtil.TASK_STATUS.END) return CodeUtil.TASK_STATUS_COLOR.END;

    }
    return {
        title: route.params.task.title,
        headerStyle: {
            backgroundColor: getColorByStatus(route.params.task.status),
            height: 120
        },
        headerLeftContainerStyle: {
            marginLeft: 15
        },
        headerBackTitleStyle: {
            fontSize: 18, fontWeight: "bold"
        },
        headerBackTitle: "할일",
        headerTintColor: '#fff',
        cardStyleInterpolator: forFade, 
        headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
        },
    }
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const HomeStackNavigation = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [currentScreen, setCurrenScreen] = useState("ToDoListScreen");
    useEffect(() => {
        const unsubscribe = navigation.addListener("transitionStart", (e) => {
            console.log("123123")
        })
    }, [navigation])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <HomeStack.Navigator initialRouteName={currentScreen}>
            <HomeStack.Screen name="ToDoListScreen" component={ToDoListScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={TaskDetailHeaderOptions} />
        </HomeStack.Navigator>
    )
}
export default HomeStackNavigation;