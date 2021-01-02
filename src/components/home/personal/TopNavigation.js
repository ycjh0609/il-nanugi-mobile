import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-elements';
import commonStyle from '../../../common/styles/commonStyle';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon 
 * Description : Personal Dashboard Top Navigation 
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    topNavContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#eee',
        borderBottomWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10
    },

});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const TASK_STATUS_ARR = ["전체","진행","완료"];
const SORT_TYPE_ARR = ["마감","중요","그룹"];

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TopNavigation = ({collocate}) => {

    const [taskStatusText,setTaskStatusText] = useState("");
    const [sortTypeText,setSortTypeText] = useState("");
    
    /***************************
     * sortType, cardStatus Rotation
    ***************************/
    const changeSortType = useCallback(() =>{
        if (collocate.sortType < SORT_TYPE_ARR.length-1 ) collocate.setSortType(collocate.sortType+1);
        else collocate.setSortType(0);
    });

    const changetaskStatus = useCallback(() =>{
        if (collocate.taskStatus < TASK_STATUS_ARR.length-1 ) collocate.setTaskStatus(collocate.taskStatus+1);
        else collocate.setTaskStatus(0);
    });
    /***************************
     * sortType, cardStatus 가 변경되었을때 텍스트 변경 Hook
    ***************************/
    useEffect(() => {
        setSortTypeText(SORT_TYPE_ARR[collocate.sortType]);
        setTaskStatusText(TASK_STATUS_ARR[collocate.taskStatus]);

    }, [collocate.taskStatus,collocate.sortType]);
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.topNavContainer}>
            <View style={commonStyle.rowAlignment}>
                <Icon onPress={changetaskStatus} name="filter-list" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>{taskStatusText}</Text>
            </View>
            <View style={commonStyle.rowAlignment}>
                <Icon onPress={changeSortType} name="sort" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>{sortTypeText}</Text>
            </View>
        </View>
    )
}

export default TopNavigation;