import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import moment from "moment-timezone";
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({
    timeWrapper: {
        alignItems: "center",
        backgroundColor: "black", 
        width: 33, 
        borderRadius: 6
    },
    timeText: {
        fontSize: 18,
        color: "white",
        fontWeight: "600"
    },
    timeUnitText:{
        fontSize:13
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    columnCenter: {

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Static Function Group ******************************************************************************************************/

/* 02) End Static Function Group ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const TaskTimer = ({deadlineTime}) => {
    const [remainTime,setRemainTime] = useState({remainMinutes:"00",remainHours:"00",remainDays:"00",remainMonths:"00"});
    
    const calcurateRemainTime = useCallback(() =>{
        let endDate = moment(deadlineTime,"YYYYMMDDHHmm");
        // timezone 설정 귀찮아서 일단 +9 시간을 하자 ..
        let now = new Date();
        now.setHours(now.getHours()+9);
        let nowDate = moment(now);
        let remainMinutes,remainHours,remainDays,remainMonths;
        let diff = endDate - nowDate;

        if (diff <= 0) return {remainMinutes:"00",remainHours:"00",remainDays:"00",remainMonths:"00"}

        let duration = moment.duration(diff);
        remainMinutes = duration.minutes();
        remainHours = duration.hours();
        remainDays = duration.days();
        remainMonths = duration.months() + duration.years()*12;


        remainMinutes = remainMinutes < 10 ? "0"+remainMinutes : ""+remainMinutes
        remainHours = remainHours < 10 ? "0"+remainHours : ""+remainHours
        remainDays = remainDays < 10 ? "0"+remainDays : ""+remainDays
        remainMonths = remainMonths < 10 ? "0"+remainMonths : ""+remainMonths

        return {remainMinutes,remainHours,remainDays,remainMonths}
    });
    
    /***************************
     * 30초에 한번씩 time 을 refresh
    ***************************/
    useEffect(() => {
        setRemainTime(calcurateRemainTime(deadlineTime));
        let interval = setInterval(()=>{
            setRemainTime(calcurateRemainTime());
        },30 * 1000);
        return ()=>{
            clearInterval(interval);
        }
    }, [deadlineTime]);
    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View style={{
            ...styles.rowCenter
        }}>
            <View style={{ ...styles.columnCenter }}>
                <View style={{ ...styles.timeWrapper }}>
                    <Text style={styles.timeText}>{remainTime.remainMonths}</Text>
                </View>
                <Text style={styles.timeUnitText}>Month</Text>
            </View>

            <View style={{ ...styles.columnCenter, marginLeft: 10, marginRight: 5 }}>
                <View style={{ ...styles.timeWrapper }}>
                    <Text style={styles.timeText}>{remainTime.remainDays}</Text>
                </View>
                <Text style={styles.timeUnitText}>Day</Text>
            </View>

            <View style={{ ...styles.columnCenter, marginLeft: 5, marginRight: 10 }}>
                <View style={{ ...styles.timeWrapper }}>
                    <Text style={styles.timeText}>{remainTime.remainHours}</Text>
                </View>
                <Text style={styles.timeUnitText}>Hour</Text>
            </View>

            <View style={{ ...styles.columnCenter }}>
                <View style={{ ...styles.timeWrapper }}>
                    <Text style={styles.timeText}>{remainTime.remainMinutes}</Text>
                </View>
                <Text style={styles.timeUnitText}>Min</Text>
            </View>
        </View>
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default TaskTimer;