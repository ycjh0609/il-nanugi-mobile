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
const ToDoList = ({ navigation, items, setItems }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    /***************************
     * 렌더링 될 각 카드에 전달할 각 카드 setter 생성 
    ***************************/
    const getTaskUpdater = useCallback(passedTask => {
        // 각 카드가 변경되어 setCard가 호출되면 카드 전체를 setter로 변경
        const updateTask = (_task) => {
            let updatedTaskIdx = (items.tasks.findIndex((task) => task.id === passedTask.id));
            items.tasks[updatedTaskIdx] = _task;
            setItems.setTasks([...items.tasks]);
        }
        return updateTask;
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
            <ToolBar items={items} />
            {/* 03. content */}
            <ScrollView style={{ marginBottom: 200 }}>
                {items.tasks.map((task, idx) => {
                    return (
                        <ToDoCard key={"to-do-card-" + idx}
                            task={task}
                            updateTask={getTaskUpdater(task)}
                            groupName={createGroupName(task.group.name)} />
                    )
                })}
            </ScrollView>


        </View>
    )
}
export default ToDoList;