import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button } from "react-native";
import { Badge } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import commonStyle from "../../../common/styles/commonStyle";
import { useStoreState, defineStoreItem } from '../../../common/utils/store/commonStore';
import TopNavigation from './TopNavigation';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.01
 * Edit By     : kwak ji hoon 
 * Description : Group Dashboard
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    screenContainer: {
        marginLeft: 10
        , marginRight: 10
        , marginBottom: 560
    },
    cardRow: {
        ...commonStyle.rowAlignment,
        ...commonStyle.rowCenter,
        marginBottom: 20,
    },
    cardContainer: {
        justifyContent: "center",
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 25,
        marginLeft: 15,
        marginRight: 15,
    },
    cardContent: {
        fontSize: 25,
        fontWeight: "500"
    },
    cardName: {
        textAlign: "center",
        fontSize: 15,
        marginTop: 5
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const CNT_BY_ROW = 3;
function createContentName(name) {
    if (name.split(" ").length == 1) {
        return name.split(" ")[0].substring(0, 2);
    } else if (name.split(" ").length > 1) {
        return name.split(" ")[0].substring(0, 1) + " " + name.split(" ")[1].substring(0, 1);
    }
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const GroupDashboard = ({ groups,navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    /***************************
     * 렌더링 될 각 카드 배열 형식 변경
    ***************************/
    const reCollacatedGroups = useCallback(() => {
        let groupCards = [];
        let rowCnt = parseInt(groups.length / CNT_BY_ROW) + (groups.length % CNT_BY_ROW == 0 ? 0 : 1);
        for (let i = 0; i < rowCnt; i++) {
            // CNT_BY_ROW 만큼 배열 자르기
            let temp = groups.slice((i * CNT_BY_ROW), (i * CNT_BY_ROW) + 3);
            for (let j = temp.length; j < CNT_BY_ROW; j++)
                // 개수보다 작으면 빈 카드 푸시~
                if (temp.length !== CNT_BY_ROW) {
                    temp.push({ id: "empty"+j, empty: true })
                }
            groupCards.push(temp);
        }
        return groupCards;
    })
    const goGroupDetailScreen = useCallback((group) => {
        navigation.navigate("GroupDetail", { group })
    })

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.screenContainer}>
            <TopNavigation />
            <ScrollView style={{ height: "100%" }}>
                {reCollacatedGroups().map((row, rowIdx) => (
                    <View key={`row-${rowIdx}`} style={styles.cardRow}>
                        {row.map((group) => {
                            if (group.empty) {
                                return <View key={group.id} style={{ ...styles.cardContainer}}></View>;
                            } else {
                                return (
                                    <View key={group.id}>
                                        <TouchableOpacity onPress={()=>goGroupDetailScreen(group)} style={{ ...styles.cardContainer, backgroundColor: group.color }}>
                                            <Text style={styles.cardContent} >
                                                {createContentName(group.name)}
                                            </Text>
                                            <View style={{ borderBottomWidth: 2, width: 15, marginTop: 10 }}></View>
                                        </TouchableOpacity>
                                        <Text style={styles.cardName}>{group.name}</Text>
                                    </View>
                                )
                            }
                        })}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
export default GroupDashboard;