import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import commonStyle from '../../styles/commonStyle';
import { CheckBox } from 'react-native-elements';
import CodeUtil from '../../utils/code/CodeUtil';

import { TouchableOpacity } from 'react-native-gesture-handler';

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
        borderWidth: 1,
        borderLeftWidth: 0,
        flex: 4.5,
        marginLeft: 0,
        marginRight: 0,
        height: 55,
        borderRadius: 0,
        borderRightWidth: 0,
        backgroundColor: "white"

    },
    detailBtnContainer: {
        flex: 1,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 15,
        height: 55,
        backgroundColor: "white"

    },
    statusTextContainer: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        height: 20,
        width: 55,
        justifyContent: "center",
        borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1,
    },
    groupLabelContainer: {
        flex: 1,
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        height: 55
    },
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ToDoCard = ({ navigation, task, updateTask, groupName, sortType }) => {
    const [endTimeText, setEndTimeText] = useState("");

    const isEndStatus = useCallback((status) => {
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


    useEffect(function handleEndTimeText() {
        if (sortType === 0) {
            let temp = moment(task.endTime, 'YYYYMMDDhhmm').format('YYYY.MM.DD hh:mm');
            setEndTimeText(temp);
        }
    }, [task])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (


        <View style={{ flexDirection: "column", ...commonStyle.shodow }}>

            <View style={{
                flexDirection: 'row', justifyContent: 'flex-end', marginBottom: -5
            }}>
                <View style={{
                    borderColor: CodeUtil.getTaskColorByStatus(task.status),
                    backgroundColor: CodeUtil.getTaskColorByStatus(task.status),
                    ...styles.statusTextContainer
                }}>
                    <Text style={{ textAlign: "center", color: "white" }}>{CodeUtil.getTaskTextByStatus(task.status)}</Text>
                </View>
            </View>

            <View style={{ ...commonStyle.rowAlignment, marginBottom: 3 }}>
                {/* group Label Container */}

                {/* group Label Container */}
                <View style={{ ...styles.groupLabelContainer, backgroundColor: task.group.color, borderColor: task.group.color }}>
                    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                        <View style={{ ...commonStyle.columnCenterAlignment }}>
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>{groupName}</Text>
                        </View>
                    </View>
                </View>

                {/* CheckBox Container */}
                <CheckBox
                    containerStyle={{ ...styles.checkBoxContainer, borderColor: task.group.color, }}
                    textStyle={{

                        fontSize: 16,
                        textDecorationLine: isEndStatus(task.status) ? 'line-through' : null,
                        color: task.status === CodeUtil.TASK_STATUS.END ? "grey":null
                    }}
                    checkedColor={commonStyle.oneBackxgroundColor}
                    checked={isEndStatus(task.status) ? true : false}
                    title={task.title}
                    onPress={() => changeTaskStatus(task)}
                />


                <View style={{
                    ...styles.detailBtnContainer,
                    borderColor: task.group.color,
                    borderTopColor: CodeUtil.getTaskColorByStatus(task.status)
                }}>
                    <View onTouchStart={() => navigation.navigate("TaskDetailScreen", { task })} style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                        <View style={{ ...commonStyle.columnCenterAlignment, justifyContent: "center" }}>
                            {/* <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>{CodeUtil.getTaskTextByStatus(task.status)}</Text> */}
                            <Text style={{ fontWeight: "600", fontSize: 20 }}>...</Text>
                        </View>
                    </View>
                </View>

            </View>

        </View>

    )
}

export default ToDoCard;