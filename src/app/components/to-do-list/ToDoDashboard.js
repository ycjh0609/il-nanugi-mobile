import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Animated, Image } from "react-native";
import commonStyle from '../../styles/commonStyle';
import CommonBtn from '../common/CommonBtn';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.26 
 * Edit By     : kwak ji hoon 
 * Description : ToDo Top Dashboard 
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
        height: 27,
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
const HomeDashboard = ({ items }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const guagePercentage = useRef(new Animated.Value(0)).current;
    const [remainTaskCnt, setRemainTaskCnt] = useState(0);
    const [joinedGroupCnt, setJoinedGroupCnt] = useState(0);
    const [percentage, setPercentage] = useState(0);


    useEffect(() => {
        setRemainTaskCnt(items.tasks.length);
        setJoinedGroupCnt(items.groups.length);
        let temp = items.tasks.filter((t) => t.status == "E").length / items.tasks.length * 100;
        setPercentage(parseInt(temp));
    }, [items]);

    useEffect(() => {
        Animated.timing(guagePercentage, {
            toValue: Number.isNaN(percentage) ? 0 : percentage,
            duration: 300,
            useNativeDriver: false
        }).start();
    }, [percentage]);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>
            <View style={styles.taskCntContainer}>
                <CommonBtn onPress={() => null} style={commonStyle.shodow} btnStyle={{ btnSize: DEFAULT_BTN_SIZE, type: 1 }}
                    titleStyle={{ name: remainTaskCnt, subName: "할일" }} />
            </View>
            <View style={styles.taskCntContainer}>
                <CommonBtn onPress={() => null} style={commonStyle.shodow} btnStyle={{ btnSize: DEFAULT_BTN_SIZE, type: 1 }}
                    titleStyle={{ name: joinedGroupCnt, subName: "그룹" }} />
            </View>

            <View style={styles.guageContainer}>

                {/* <Text style={{textAlign:"center",fontSize:18,fontWeight:"600",marginBottom:5}}>달성률</Text> */}
                <Animated.View style={{
                    marginLeft: (guagePercentage.interpolate({
                        inputRange: [0, 100],
                        outputRange: ["0%", "85%"]
                    }))
                }}>
                    <Image style={{ height: 40, width: 40 }} source={require('../../assets/images/running-suite.gif')} />
                    {/* {(guagePercentage < 100 || guagePercentage > 0) &&
                    } */}
                </Animated.View>
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