import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Animated } from "react-native";
import commonStyle from '../../styles/commonStyle';
import CommonBtn from '../common/CommonBtn';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.26 
 * Edit By     : kwak ji hoon 
 * Description : Home Top Dashboard (Home task 상태)
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    container: {
        height: 80,
        ...commonStyle.rowAlignment,
        paddingLeft: 15,
        paddingRight: 15,
    },
    taskCntContainer: {
        flex: 2,
        ...commonStyle.columnCenterAlignment
    },
    guageContainer: {
        flex: 6
    },
    guageTitle: {
        fontSize: 17, paddingBottom: 10, textAlign: "center"
    },
    guage: {
        ...commonStyle.shodow,
        borderRadius: 15,
        height: 35,
        backgroundColor: "#d4d6d6",
        paddingLeft: 5,
    },
    leftGuage: {
        height: "100%",
        backgroundColor: "#0c5063",
        //borderTopLeftRadius: 18,
        //borderBottomLeftRadius: 18,
        borderRadius: 10,
        ...commonStyle.rowAlignment,

    },
    leftGuageText: {
        flex: 1,
        textAlign: "right",
        fontSize: 14,
        color: commonStyle.oneTextInColor,
        paddingRight: 10
    },
    rightGuage: {

    }
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const DEFAULT_BTN_SIZE = 65;
const ACTIVATE_BTN_SIZE = 65;
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const HomeDashboard = ({ items, currentPage, setCurrentPage }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const guagePercentage = useRef(new Animated.Value(5)).current;
    const [remainTaskCnt, setRemainTaskCnt] = useState(0);
    const [joinedGroupCnt, setJoinedGroupCnt] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const changePage = useCallback((page) => {
        if (page != currentPage) {
            setCurrentPage(page);
        }
    })
    useEffect(() => {
        setRemainTaskCnt(items.tasks.length);
        setJoinedGroupCnt(items.groups.length);
        let temp = items.tasks.filter((t) => t.status == "E").length / items.tasks.length * 100;
        setPercentage(parseInt(temp))
    }, [items]); 

 
    useEffect(() => {
        Animated.timing(guagePercentage, {
            toValue: percentage,
            duration: 500,
            useNativeDriver: false
        }).start(); 
    }, [percentage]);


    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>
            <View style={styles.taskCntContainer}>
                <CommonBtn onPress={() => changePage(0)} style={commonStyle.shodow} btnStyle={{ btnSize: currentPage == 0 ? ACTIVATE_BTN_SIZE : DEFAULT_BTN_SIZE, type: 1 }}
                    titleStyle={{ name: remainTaskCnt, subName: "할일" }} />
            </View>
            <View style={styles.taskCntContainer}>
                <CommonBtn onPress={() => changePage(1)} style={commonStyle.shodow} btnStyle={{ btnSize: currentPage == 1 ? ACTIVATE_BTN_SIZE : DEFAULT_BTN_SIZE, type: 1 }}
                    titleStyle={{ name: joinedGroupCnt, subName: "그룹" }} />
            </View>

            <View style={styles.guageContainer}>
                
                <Text style={{textAlign:"center",fontSize:18,fontWeight:"600",marginBottom:5}}>오늘 할일</Text>
                <View style={styles.guage}>
                    <Animated.View style={{
                        ...styles.leftGuage,
                        width: (guagePercentage.interpolate({
                            inputRange: [0, 100],
                            outputRange: ["0%", "100%"]
                        }))
                    }}>
                        <Text style={styles.leftGuageText}>{percentage}%</Text>
                    </Animated.View>
                    <View style={styles.rightGuage}></View>
                </View>
            </View>
        </View>
    )
}
export default HomeDashboard;