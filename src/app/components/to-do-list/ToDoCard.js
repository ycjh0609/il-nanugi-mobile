import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-elements';
import commonStyle from '../../../common/styles/commonStyle';
import { CheckBox } from 'react-native-elements';
import CodeUtil from '../../utils/code/CodeUtil';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.01
 * Edit By     : kwak ji hoon 
 * Description : Group Dashboard Top Navigation 
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    checkBoxContainer: {
        padding: 15,
        //borderTopLeftRadius: 15,
        //borderBottomLeftRadius: 15,

        borderWidth: 1,
        flex: 4.5,
        marginLeft: 0,
        marginRight: 0,
        height: 55,
    },
    statusLabelContainer: {
        flex: 0.5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        width: "100%", height: 55
    },
    groupLabelContainer: {
        flex: 1,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        width: "100%", height: 55
    }
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ToDoCard = ({ task, updateTask, groupName }) => {
    const [checkBoxContainerStyle, setCheckBoxContainerStyle] = useState({});
    const [statusLabelContainerStyle, setStatusLabelContainerStyle] = useState({});
    const containerOpacity = task.status === CodeUtil.TASK_STATUS.TODO? 0.3:0;
    const isFinished = useCallback((status) => {
        return (status === CodeUtil.TASK_STATUS.END)
    });
    const changeTaskStatus = useCallback((task) => {
        let status = task.status;
        if (status === CodeUtil.TASK_STATUS.TODO) {
            status = CodeUtil.TASK_STATUS.DOING
        } else if (status === CodeUtil.TASK_STATUS.DOING) {
            status = CodeUtil.TASK_STATUS.END;
        } else if (status === CodeUtil.TASK_STATUS.END) {
            status = CodeUtil.TASK_STATUS.TODO;
        }
        updateTask({ ...task, status });
    })

    useEffect(function handleContainerStyle() {
        if (task.status === CodeUtil.TASK_STATUS.TODO) {
            setStatusLabelContainerStyle({ backgroundColor: "grey" });
        } else {
            setStatusLabelContainerStyle({ backgroundColor: commonStyle.oneBackgroundColor });
        }
    },[task])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={commonStyle.rowAlignment}>

            <View style={{ ...styles.statusLabelContainer, ...statusLabelContainerStyle }}>
                <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                    <View style={{ ...commonStyle.columnCenterAlignment, justifyContent: "center" }}>
                        <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>{CodeUtil.GET_STATUS_TEXT(task.status)}</Text>
                    </View>
                </View>

            </View>

            {/* CheckBox Container */}
            <CheckBox
                containerStyle={{ ...styles.checkBoxContainer, borderColor: task.group.color, }}
                textStyle={{
                    fontSize: 15,
                    textDecorationLine: isFinished(task.status) ? 'line-through' : null
                }}
                lable={"asdf"}
                checked={isFinished(task.status) ? true : false}
                title={task.title}
                onPress={() => changeTaskStatus(task)}
            />

            {/* group Label Container */}
            <View style={{ ...styles.groupLabelContainer, backgroundColor: task.group.color, }}
                onTouchStart={() => {
                }}>
                <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                    <View style={{ ...commonStyle.columnCenterAlignment, justifyContent: "center" }}>
                        <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>{groupName}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default ToDoCard;