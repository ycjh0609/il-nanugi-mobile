import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
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
    timerContainer:{
        borderTopLeftRadius: 7,
        borderTopRightRadius: 0,
        height: 20,
        width: 200,
        justifyContent: "center",
        borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1,
        
    },
    statusTextContainer: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 7,
        height: 20,
        width: 53,
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
    const goTaskDetail = useCallback(()=>{
        navigation.navigate("TaskDetailScreen", { task });
    })
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
        let temp = moment(task.endTime, 'YYYYMMDDhhmm').format('YY년 MM월 DD일 hh:mm');
        setEndTimeText(temp);
    }, [task])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (


        <View style={{ flexDirection: "column", ...commonStyle.shodow }}>  
            
            {/*-------------------------------------------------
              * 01) status Label 
              * ----------------------------------------------*/}
            <View style={{
                flexDirection: 'row', justifyContent: 'flex-end', marginBottom: -5
            }}>
                <View style={{
                    borderColor: CodeUtil.getTaskColorByStatus(task.status),
                    ...styles.timerContainer
                }}>
                    <Text style={{ textAlign: "center" }}>
                        <Icon name="calendar-check"/>
                        {"  "}
                        {endTimeText}
                    </Text>
                </View>

                <View style={{
                    borderColor: CodeUtil.getTaskColorByStatus(task.status),
                    backgroundColor: CodeUtil.getTaskColorByStatus(task.status),
                    ...styles.statusTextContainer
                }}>
                    <Text style={{ textAlign: "center", color: "white" }}>{CodeUtil.getTaskTextByStatus(task.status)}</Text>
                </View>
            </View>


            {/*-------------------------------------------------
              * 02) Box Main Container
              * ----------------------------------------------*/}
            <View style={{ ...commonStyle.rowAlignment, marginBottom: 5 }}>
                {/*-------------------------------------------------
                  * 02-1) group Label Container
                  * ----------------------------------------------*/}
                <View style={{ ...styles.groupLabelContainer, backgroundColor: task.group.color, borderColor: task.group.color }}>
                    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                        <View style={{ ...commonStyle.columnCenterAlignment }}>
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>{groupName}</Text>
                        </View>
                    </View>
                </View>

                {/*-------------------------------------------------
                  * 02-2) CheckBox Container
                  * ----------------------------------------------*/}
                <CheckBox
                    containerStyle={{ ...styles.checkBoxContainer, borderColor: task.group.color, }}
                    textStyle={{
                        fontSize: 16,
                        textDecorationLine: isEndStatus(task.status) ? 'line-through' : null,
                        color: task.status === CodeUtil.TASK_STATUS.END ? CodeUtil.TASK_STATUS_COLOR.TODO:null
                    }}
                    checkedColor={commonStyle.oneBackxgroundColor}
                    checked={isEndStatus(task.status) ? true : false}
                    title={task.title}
                    onPress={() => changeTaskStatus(task)}
                />

                {/*-------------------------------------------------
                  * 02-3) Go Detail Button Container (...)
                  * ----------------------------------------------*/}
                <View 
                    onTouchStart={goTaskDetail}
                    style={{
                            ...styles.detailBtnContainer,
                            borderColor: task.group.color,
                            borderTopColor: CodeUtil.getTaskColorByStatus(task.status) }}>
                    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                        <View style={{ ...commonStyle.columnCenterAlignment, justifyContent: "center" }}>
                            <Icon name="ellipsis-h" size={15}  color={"grey"}/>
                        </View>
                    </View>
                </View>

            </View>

        </View>

    )
}

export default ToDoCard;