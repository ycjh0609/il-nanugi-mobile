import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import _ from "lodash";
import ToolBar from "./ToolBar"
import GroupCard from "./GroupCard"
import commonStyle from '../../../common/styles/commonStyle';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : SimpleBoard
 *----------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        margin: 20
    },

    groupCardContainer: {
        flex: 1,
        margin: 7,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 25
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

const CNT_BY_ROW = 3;
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const GroupList = ({ navigation, groupsState }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    /***************************
     * 렌더링 될 각 카드 배열 형식 변경
    ***************************/
    const reCollacatedGroups = useCallback(() => {
        let groupCards = [];
        let groups = groupsState.groups;
        let rowCnt = parseInt(groups.length / CNT_BY_ROW) + (groups.length % CNT_BY_ROW == 0 ? 0 : 1);
        for (let i = 0; i < rowCnt; i++) {
            // CNT_BY_ROW 만큼 배열 자르기
            let temp = groups.slice((i * CNT_BY_ROW), (i * CNT_BY_ROW) + 3);
            for (let j = temp.length; j < CNT_BY_ROW; j++)
                // 개수보다 작으면 빈 카드 푸시~
                if (temp.length !== CNT_BY_ROW) {
                    temp.push({ id: "empty" + j, isEmpty: true })
                }
            groupCards.push(temp);
        }
        return groupCards;
    })
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>
            {/* 01. title and toolbar */}
            <ToolBar />
            {/* 02. List */}
            <ScrollView>
                <View style={{ marginBottom: 550 }}>
                    {reCollacatedGroups().map((groupsRow,i)=>(
                        <View key={"rows-"+i} style={commonStyle.rowAlignment}>
                            {groupsRow.map((group,j)=>(
                                <GroupCard key={"group-"+j} group={group} title={group.name}/>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}
export default GroupList;