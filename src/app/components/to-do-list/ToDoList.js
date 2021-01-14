import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

import ToolBar from './ToolBar';
import ToDoCard from './ToDoCard';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : SimpleBoard
 *----------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    textType01: {
        fontSize: 30,
        fontWeight: "800"
    },
    textType02: {
        fontSize: 18,
        fontWeight: "600"
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
function createGroupName(name) {
    if (name.split(" ").length == 1) {
        return name.split(" ")[0].substring(0, 2);
    } else if (name.split(" ").length > 1) {
        return name.split(" ")[0].substring(0, 1) + "" + name.split(" ")[1].substring(0, 1);
    }
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ToDoList = ({ navigation, route,setTasks ,tasks, groups, currentPage, setCurrentPage }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const updateTasks = useCallback((idx,task)=>{
        console.log(123)
        tasks[idx] = task;
        console.log(1)
        setTasks(tasks);
    })
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>

            {/* 01. title */}
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.textType01}>할일</Text>
                <Text style={styles.textType02}> Check List</Text>
            </View>
            <View style={{ borderBottomWidth: 1, width: 170, marginTop: 10 }}></View>
            {/* 02. toolbar */}
            <ToolBar />
            {/* 03. content */}
            <ScrollView style={{ marginBottom: 200 }}>

                {tasks &&
                    tasks.filter((task_) => true)
                        .map((task, idx) => {
                            return (
                                <ToDoCard key={"to-do-card-"+idx} idx={idx} task={task} updateTasks={updateTasks} groupName={createGroupName(task.group.name)}></ToDoCard>
                            )
                        })}
            </ScrollView>


        </View>
    )
}
export default ToDoList;