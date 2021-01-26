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

    },
    statusLabelContainer: {
        flex: 0.5,
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        width: "100%", height: 55
    },
    groupLabelContainer: {
        flex: 1,
        borderWidth: 1,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        width: "100%", height: 55
    },

});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const TASK_STATUS_COLOR = {
    TODO:"#999793",DOING:"#f5ad42",END:commonStyle.oneTextColor
}

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ToDoCard = ({ navigation,task, updateTask, groupName, sortType }) => {
    const [statusLabelContainerStyle, setStatusLabelContainerStyle] = useState({});
    const [groupLabelContainerStyle, setGroupLabelContainerStyle] = useState({});
    const [checkBoxTextStyle, setCheckBoxTextStyle] = useState({});
    const [endTimeText,setEndTimeText] = useState("");
    
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

    useEffect(function handleContainerStyle() {
        if (task.status === CodeUtil.TASK_STATUS.TODO) {
            setStatusLabelContainerStyle({ backgroundColor: TASK_STATUS_COLOR.TODO, borderColor: TASK_STATUS_COLOR.TODO });
            setCheckBoxTextStyle({ color: TASK_STATUS_COLOR.TODO });
        } else if (task.status === CodeUtil.TASK_STATUS.DOING) {
            setStatusLabelContainerStyle({ backgroundColor: TASK_STATUS_COLOR.DOING, borderColor: TASK_STATUS_COLOR.DOING });
            setCheckBoxTextStyle({});
        } else if (task.status === CodeUtil.TASK_STATUS.END) {
            setStatusLabelContainerStyle({ backgroundColor: commonStyle.oneBackgroundColor, borderColor: commonStyle.oneBackgroundColor });
            setCheckBoxTextStyle({});
        }
    }, [task]);
    useEffect(function handleEndTimeText(){
        if (sortType === 0){
            let temp = moment(task.endTime, 'YYYYMMDDhhmm').format('YYYY.MM.DD hh:mm');
            setEndTimeText(temp);
        }
    },[task])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (

        <View style={{ flexDirection: "column" }}>

            <View style={{ ...commonStyle.rowAlignment, marginTop: 5 }}>
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
                        ...checkBoxTextStyle,
                        fontSize: 16,
                        textDecorationLine: isEndStatus(task.status) ? 'line-through' : null
                    }}
                    checkedColor={commonStyle.oneBackgroundColor}
                    checked={isEndStatus(task.status) ? true : false}
                    title={task.title}
                    onPress={() => changeTaskStatus(task)}
                />
                {/* group Label Container */}
                <View style={{ ...styles.goDetailContainer}}>
                    {/* Todo dev 과제 */}
                </View>
                {/* group Label Container */}
                <View style={{ ...styles.groupLabelContainer, backgroundColor: task.group.color, borderColor: task.group.color }}
                    onTouchStart={() => navigation.navigate("TaskDetailScreen",{task})}>
                    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                        <View style={{ ...commonStyle.columnCenterAlignment }}>
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>{groupName}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {sortType === 0 &&
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',marginRight:10 }}>
                    {/* <Icon name="md-calendar" style={{marginRight:5}} size={20}/>  */}
                    <Text> ~</Text>
                    <Text style={{marginLeft:5,fontSize:15}}>{endTimeText}</Text>
                </View>
            }
        </View>

    )
}

export default ToDoCard;