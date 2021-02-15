


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'
import moment from "moment"
import Icon from "react-native-vector-icons/FontAwesome5";
import ShakingIcon from "../common/ShakingIcon"
import CodeUtil from '../../utils/code/CodeUtil';
import { isNil } from 'lodash';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.02.13 
 * Edit By     : kwak ji hoon 
 * Description : Task Detail Date Picker
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    container: {
        borderRadius: 10
        , borderTopRightRadius: 0
        , borderWidth: .3
    },
    yearTitleContainer: {
        flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20,
    },
    yearTitle: {
        width: 70
        , padding: 2

        , borderWidth: .3
        , borderBottomWidth: 0
        , borderTopLeftRadius: 5
        , borderTopRightRadius: 5
    }
    , cardContainer: {
        flexDirection: "row", justifyContent: "center"
    }
    , timePickerContainer: {

    }
    , btnContainer: {
        flexDirection: "column", justifyContent: "center"
    }

});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TimePicker = ({ timeState }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const containerHeight = useRef(new Animated.Value(70)).current;
    const [canEdit, setCanEdit] = useState(false);
    const [time, setTime] = useState(new Date());

    const changeTime = useCallback((date) => {
        setTime(date);
    });
    useEffect(() => {
        setTime(moment(timeState.time, 'YYYYMMDDhhmm').toDate())
    }, [timeState]);
    useEffect(() => {
        Animated.timing(containerHeight, {
            toValue: canEdit ? 115 : 70,
            duration: 300,
            useNativeDriver: false
        }).start();
    }, [canEdit]);
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={{
            ...styles.container, backgroundColor: CodeUtil.TASK_STATUS_CARD_BACK_COLOR.END
            , borderColor: CodeUtil.TASK_STATUS_COLOR.END
        }}>
            {/*------------------------------ 
              1) year title
              ------------------------------*/}
            <View style={styles.yearTitleContainer}>
                <View style={{
                    ...styles.yearTitle
                    , borderColor: CodeUtil.TASK_STATUS_COLOR.END
                    , backgroundColor: CodeUtil.TASK_STATUS_CARD_BACK_COLOR.END
                }}>
                    <Text style={{ textAlign: "center" }}>{time.getFullYear()}년</Text>
                </View>
            </View>
            {/*------------------------------ 
              2) card contaienr
              ------------------------------*/}
            <Animated.View style={{ height: containerHeight, ...styles.cardContainer }}>
                {/*------------------------------ 
                  2-1) time picker
                ------------------------------*/}
                <View onTouchStart={() => setCanEdit(true)} style={{ flex: 7, justifyContent: "center" }}>
                    <DatePicker
                        style={{
                            height: canEdit ? 120 : 80
                        }}
                        locale={"ko"}
                        mode={"datetime"}
                        minuteInterval={5}
                        date={time}
                        onDateChange={changeTime}
                    />
                </View>
                {/*------------------------------ 
                  2-2) edit, save button
                 ------------------------------*/}
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => setCanEdit(!canEdit)}>
                            {canEdit &&
                                <ShakingIcon size={22} name={"save"} />
                            }
                            {!canEdit &&
                                <Icon size={20} name={"edit"} />
                            }
                            <Text style={{ fontSize: 12, marginTop: 5 }}>{canEdit ? "저장" : "편집"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>

        </View>
    )
}
export default TimePicker;