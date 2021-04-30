import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import ToDoListScreen from '../containers/ToDoListScreen';
import TaskDetailScreen from "../containers/TaskDetailScreen";
import CodeUtil from '../utils/code/CodeUtil';
import commonStyle from '../styles/commonStyle';
import CreateTaskScreen from '../containers/CreateTaskScreen';
import { BottomSheet, Overlay } from 'react-native-elements';
import TaskService from '../services/TaskService';
import { defineStoreItem, useStoreState } from '../utils/store/commonStore';
import ShakingIcon from '../components/common/ShakingIcon';


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


const TaskDetailHeaderOptions = ({ route, navigation }) => {
    //https://reactnavigation.org/docs/stack-navigator#navigationoptions-used-by-stacknavigator

    //태스크 하나 불러와야함(todo)
    let task = route.params.task;
    let taskTitle = task ? task.title : "";
    let taskStatus = task ? task.status : "";
    let taskId = task ? task.id : "";

    let canModify = route.params.canModify == true; // undifined

    return {
        title: taskTitle,
        headerStyle: {
            backgroundColor: CodeUtil.getTaskColorByStatus(taskStatus),
            height: 120
        },
        headerLeftContainerStyle: { marginLeft: 15 },
        headerRightContainerStyle: { marginRight: 30 },
        headerBackTitleStyle: {
            fontSize: 18, fontWeight: "bold"
        },
        headerBackTitle: "할일",
        headerTintColor: '#fff',
        cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
                opacity: current.progress,
            },
        }),
        headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        headerRight: () => {
            const [canModify,setCanModify] = useState(false);
           
            const goTaskDetail = useCallback(() => {
                
                navigation.navigate("TaskDetailScreen", { task,canModify:!canModify });
            })
            const changeTaskTitle = () => {
                
                TaskService.updateTask({ title: "test 입니다." }, taskId).then((res) => {

                });
            }
            return (
                <View>
                    <TouchableOpacity onPress={goTaskDetail}>
                        <View style={{ ...commonStyle.columnCenterAlignment }}>
                            <View style={{ ...commonStyle.rowAlignment }}>
                                {canModify  &&
                                    <ShakingIcon size={100} name={"edit"} color={"white"}></ShakingIcon>
                                }
                                {!canModify  &&
                                    <Icon size={20} name={"edit"} color={"white"}></Icon>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            )
        },
        headerTitle: () => {

            return (
                <View style={{ alignContent: "center" }}>
                    {canModify &&
                        <TextInput style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
                            {taskTitle} {canModify}
                        </TextInput>
                    }
                    {!canModify &&
                        <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
                            {taskTitle}
                        </Text>
                    }
                </View>
            )
        }
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
        if (route.params.routeName) {
            navigation.navigate(route.params.routeName)
        }
    }, [route.params])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <HomeStack.Navigator initialRouteName={"ToDoListScreen"} >
            <HomeStack.Screen name="ToDoListScreen" component={ToDoListScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={TaskDetailHeaderOptions} />
            <HomeStack.Screen name="CreateTaskScreen" component={CreateTaskScreen} options={TaskDetailHeaderOptions} />
        </HomeStack.Navigator>
    )
}
export default HomeStackNavigation;