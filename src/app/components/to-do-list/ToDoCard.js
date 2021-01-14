import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-elements';
import commonStyle from '../../../common/styles/commonStyle';
import { CheckBox } from 'react-native-elements';

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
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        
        borderWidth: 1,
        flex: 5,
        marginLeft: 0,
        marginRight: 0,
        height: 55,
    },
    groupLabelContainer:{
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
const ToDoCard = ({ task,updateTasks,idx, groupName }) => {

    useEffect(()=>{
        console.log(task)
    })
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={commonStyle.rowAlignment}>
             {/* CheckBox Container */}
            <CheckBox
                containerStyle={{...styles.checkBoxContainer,borderColor: task.group.color,}}
                textStyle={{
                    fontSize: 15,
                    textDecorationLine: task.status == "E" ? 'line-through' : null
                }}
                checked={task.status == "E" ? true : false}
                title={task.title}
            />

            {/* group Label Container */}
            <View style={{...styles.groupLabelContainer,backgroundColor: task.group.color,}} 
                onTouchStart={() => {
                    task.status = "A";
                    updateTasks(idx,task);
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