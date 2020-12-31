import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-elements';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon 
 * Description : Group Dashboard Top Navigation 
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
const SHAPE_TYPE = ["bar",""];
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TopNavigation = ({collocate}) => {

    const [cardShape,setCardShape] = useState("");
    
    /***************************
     * sortType, cardStatus Rotation
    ***************************/
    const changeCardShapeType = useCallback(() =>{
        if (collocate.sortType < SORT_TYPE_ARR.length-1 ) collocate.setSortType(collocate.sortType+1);
        else collocate.setSortType(0);
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
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Icon onPress={} name="filter-list" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>{taskStatusText}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Icon onPress={changeSortType} name="sort" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>{sortTypeText}</Text>
            </View>
        </View>
    )
}

export default TopNavigation;