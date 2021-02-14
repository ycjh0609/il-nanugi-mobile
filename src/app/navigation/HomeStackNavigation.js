import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ToDoListScreen from '../containers/ToDoListScreen';
import TaskDetailScreen from "../containers/TaskDetailScreen";
import CodeUtil from '../utils/code/CodeUtil';
import commonStyle from '../styles/commonStyle';

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
    
    //태스크 하나 불러와야함(todo)
    const taskParam = route.params.task;
    const forFade = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });

    return {
        title: taskParam.title,
        headerStyle: {
            backgroundColor: CodeUtil.getTaskColorByStatus(taskParam.status),
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
        headerTitle:()=>(
            <View style={commonStyle.columnCenterAlignment}>
                <View style={{ ...commonStyle.rowAlignment }}>
                    <View style={{ marginRight: 10 }} >
                        <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>{taskParam.title}</Text>
                    </View>
                    <TouchableOpacity>
                        <Icon size={20} name={"edit"} color={"white"}></Icon>
                    </TouchableOpacity>
                </View>

                {/* <View style={{ ...commonStyle.rowAlignment, marginTop: 10 }}>
                    <Icon size={16} name={"user-friends"} color={"white"}></Icon>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>{taskParam.group.name}</Text>
                    </View>
                </View> */}
            </View>
        )

    }
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const HomeStackNavigation = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    useEffect(() => {
        const unsubscribe = navigation.addListener("transitionStart", (e) => {
            console.log("123123")
        })
        return unsubscribe;
    }, [navigation])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <HomeStack.Navigator initialRouteName={"ToDoListScreen"}>
            <HomeStack.Screen name="ToDoListScreen" component={ToDoListScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={TaskDetailHeaderOptions} />
        </HomeStack.Navigator>
    )
}
export default HomeStackNavigation;