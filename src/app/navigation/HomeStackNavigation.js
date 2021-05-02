import React, { useState, useEffect, useRef, useCallback } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
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
    let taskTitle = task ? task.title : ""; //origin title
    let taskStatus = task ? task.status : "";
    let canModify = (route.params.canModify == true) || task.isNew; // undifine


    const taskCreator = () => {

        TaskService.createTask(task).then(res => {
            navigation.navigate("TaskDetailScreen", { taks: res.data, canModify: false });
        })
    }
    // center 와 rigth 에서 모두 업데이트 될 수 있도록 처리해야함 !!
    const taskTitleUpdator = (updatedTitle) => {
        
        if (!task || !task.id) return;
        if (taskTitle !== updatedTitle) {
            TaskService.updateTask({ title: updatedTitle }, task.id).then((res) => {
                navigation.navigate("TaskDetailScreen", { taks: res.data, canModify: false });
            });
        } else {
            navigation.navigate("TaskDetailScreen", { task, canModify: !canModify });
        }
    }

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

            const refreshHeader = useCallback(() => {
                if (task.isNew) {
                    taskCreator();
                } else {
                    taskTitleUpdator(task.title);
                }
            })
            return (
                <View>
                    <TouchableOpacity onPress={refreshHeader}>
                        <View style={{ ...commonStyle.columnCenterAlignment }}>
                            <View style={{ ...commonStyle.rowAlignment }}>
                                {canModify
                                    ? <ShakingIcon size={20} name={"edit"} color={"white"}></ShakingIcon>
                                    : <Icon size={20} name={"edit"} color={"white"}></Icon>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            )
        },
        headerTitle: () => {
            const [modifyingTitle, setModifyingTitle] = useState(task.title);
            useEffect(() => {
                task.title = modifyingTitle;
            }, [modifyingTitle]);
            return (
                <View style={{ alignContent: "center" }}>
                    {canModify
                        ? ( <TextInput value={modifyingTitle}
                            maxLength={15}
                            onBlur={() => taskTitleUpdator(modifyingTitle)}
                            onChangeText={text => setModifyingTitle(text)}
                            autoFocus={true} style={{ fontSize: 20, fontWeight: "600", color: "white" }} />)
                        : ( <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
                            {taskTitle}
                            </Text>)
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
            let params = {};
            if (route.params.routeParams) params = route.params.routeParams;

            navigation.navigate(route.params.routeName, params)
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