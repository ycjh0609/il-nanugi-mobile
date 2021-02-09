import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, PickerIOS, PickerIOSComponent, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from 'react-native-gesture-handler';
import commonStyle from '../../styles/commonStyle';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.01
 * Edit By     : kwak ji hoon 
 * Description : Group Dashboard Top Navigation 
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    topNavContainer: {
        width: '100%',
        borderColor: '#eee',
        borderBottomWidth: 0.5,

        marginTop: 10,
        marginBottom: 20,
        ...commonStyle.rowAlignment
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

const TASK_SORT_TYPES = ["마감", "상태", "그룹"]
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ToolBar = ({ itemStates, sortState }) => {
    const [taskCnt, setTaskCnt] = useState(0);


    /***************************
     * sortType 변경
    ***************************/
    const changeSortType = useCallback(() => {
        if (sortState.sortType > TASK_SORT_TYPES.length - 2) {
            sortState.setSortType(0);
        } else {
            sortState.setSortType(sortState.sortType + 1);
        }
    })
    
    useEffect(function calculateTaskCnt(){
        setTaskCnt(itemStates.items.tasks.length);
    }, [itemStates.items]);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.topNavContainer}>
            <View >
                <View style={{ flexDirection: 'row', }}>
                    <Text style={styles.textType01}>할일</Text>
                    <Text style={styles.textType02}> Check List</Text>
                </View>
                <View style={{ borderBottomWidth: 1, width: 160, marginTop: 10 }}></View>
            </View>
            <View>
            <TouchableOpacity activeOpacity={0.6} style={commonStyle.rowAlignment} onPress={changeSortType}>
                <Icon name="sort" size={20} />
                <Text style={{ margin: 5, fontSize: 16 }}>{TASK_SORT_TYPES[sortState.sortType]}</Text>
           
            </TouchableOpacity>
            
            <View style={{  marginTop: 10 }}></View>
            </View>
        </View>
    )
}

export default ToolBar;