import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Animated, Image} from "react-native";
import commonStyle from '../../styles/commonStyle';
import CommonBtn from '../common/CommonBtn';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.21
 * Edit By     : kwak ji hoon 
 * Description : Group Top Dashboard (Group 상태)
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
        flex: 4,
        ...commonStyle.columnCenterAlignment
    },
    guageContainer: {
        flex: 6
    },
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const DEFAULT_BTN_SIZE = 65;
const ACTIVATE_BTN_SIZE = 65;
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const GroupDashboard = ({ items }) => {
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
            toValue: Number.isNaN(percentage)? 0: percentage,
            duration:300,
            useNativeDriver: false
        }).start(); 
    }, [percentage]);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>
            <View style={styles.taskCntContainer}>
                <CommonBtn onPress={() => null} style={commonStyle.shodow} btnStyle={{ btnSize: DEFAULT_BTN_SIZE , type: 1 }}
                    titleStyle={{ name: joinedGroupCnt, subName: "그룹" }} />
            </View>

            <View style={styles.guageContainer}>

            </View>
        </View>
    )
}
export default GroupDashboard;