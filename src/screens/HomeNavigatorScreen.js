import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import HomeNew from '../components/home/HomeNew';
import TaskDetail from "../components/task-detail/TaskDetail"
import GroupDetail from '../components/group-detail/GroupDetail';
import Icon from "react-native-vector-icons/Ionicons";
import commonStyle from '../common/styles/commonStyle';
import CommonAvartar from '../components/common/CommonAvartar';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
const HeaderBackBtn = ({ onPress }) => {
    return (
        <View style={{ margin: 20, flex: 1 }}>
            <Icon size={35} onPress={onPress} name={"md-arrow-back"} />
        </View>
    )
}
const GroupDetailHeaderTitle = ({ group }) => {
    return (
        <View>
            <View style={{ ...commonStyle.rowAlignment }}>
                <Icon name={"ios-people"} style={{ marginRight: 10 }} size={30} />
                <Text style={{ fontSize: 25, fontWeight: "600", textAlign: "center" }}>{group.name}</Text>
            </View>
            <View style={{ ...commonStyle.rowAlignment, marginTop: 20 }}>
                <View style={{ ...commonStyle.rowCenter, flex: 1 }}>
                    {group.participants.map((p, idx) =>
                        <CommonAvartar key={idx} containerStyle={{ margin: 1, borderWidth: 0.5 }} title={p.name.substring(0, 1)} />)
                    }
                    <CommonAvartar containerStyle={{ opacity: 0.7, margin: 1, borderWidth: 0.5 }} title={"..."} />
                </View>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: "black", marginTop: 10 }}></View>
            <View style={{ ...commonStyle.columnCenterAlignment }}>
                <View style={{ ...commonStyle.rowAlignment, marginTop: 10 }}>
                    <Icon name={"ios-timer"} style={{ marginRight: 10 }} size={25} />
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>시작일: 2020.02.01</Text>
                </View>
                <View style={{ ...commonStyle.rowAlignment, marginTop: 5 }}>
                    <Icon name={"ios-timer"} style={{ marginRight: 10 }} size={25} />
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>종료일: 2021.09.01</Text>
                </View>
            </View>
        </View>
    )
}
const TaskDetailHeaderTitle = ({ task }) => {
    return (
        <View>
            <View style={{ ...commonStyle.rowAlignment }}>
                <Icon name={"md-book"} style={{ marginRight: 10 }} size={30} />
                <Text style={{ fontSize: 23, fontWeight: "600", textAlign: "center" }}>{task.title}</Text>
            </View>
            <View style={{ ...commonStyle.rowAlignment, marginTop: 20 }}>
                <View style={{ ...commonStyle.rowCenter, flex: 1 }}>
                    {task.participants.map((p, idx) =>
                        <CommonAvartar key={idx} containerStyle={{ margin: 1, borderWidth: 0.5 }} title={p.name.substring(0, 1)} />)
                    }
                    <CommonAvartar containerStyle={{ opacity: 0.7, margin: 1, borderWidth: 0.5 }} title={"..."} />
                </View>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: "black", marginTop: 10 }}></View>
            <View style={{ ...commonStyle.rowAlignment,...commonStyle.rowCenter , marginTop: 10}}>
                <Icon name={"md-people"} style={{ marginRight: 10 }} size={25} />
                <Text style={{ fontSize: 18, fontWeight: "500"}}>{task.group.name}</Text>
            </View>
        </View>
    )
}

const HomeStackScreen = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [currentScreen, setCurrenScreen] = useState("Home");

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <HomeStack.Navigator initialRouteName={currentScreen}>
            
            <HomeStack.Screen name="Home" component={HomeNew} options={{ headerShown: false }} />
            
            <HomeStack.Screen name="TaskDetail" component={TaskDetail} options={({ route }) => {
                let task = route.params.task;
                return {
                    headerLeft: (props) => (<HeaderBackBtn {...props} />),
                    headerTitle: (props) => (<TaskDetailHeaderTitle {...props} task={task} />),
                    headerStyle: {
                        ...styles.commonHeaderStyle,
                        backgroundColor: task.group.color,
                    },
                }
            }} />
            <HomeStack.Screen name="GroupDetail" component={GroupDetail} options={({ route }) => {
                let group = route.params.group;
                return {
                    headerLeft: (props) => (<HeaderBackBtn {...props} />),
                    headerTitle: (props) => (<GroupDetailHeaderTitle {...props} group={group} />),
                    headerStyle: {
                        ...styles.commonHeaderStyle,
                        backgroundColor: group.color,
                    },
                }
            }} />
        </HomeStack.Navigator>
    )
}
export default HomeStackScreen;