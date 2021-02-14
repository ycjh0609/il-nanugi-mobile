


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
        <View>
            <View style={{
                flexDirection: 'row', justifyContent: 'flex-end',marginTop:-20,
            }}>
                <View style={{width:70
                            ,padding:2
                            ,borderTopLeftRadius:5
                            ,borderTopRightRadius:5
                            ,backgroundColor:CodeUtil.TASK_STATUS_CARD_BACK_COLOR.DOING}}>
                    <Text style={{ textAlign:"center" }}>{time.getFullYear()}년</Text>
                </View>
            </View>
            <Animated.View style={{ height: containerHeight, flexDirection: "row", justifyContent: "center", backgroundColor: CodeUtil.TASK_STATUS_CARD_BACK_COLOR.DOING, borderRadius: 10,borderTopRightRadius:0 }}>
                <View onTouchStart={() => setCanEdit(true)} style={{ flex: 7, justifyContent: "center" }}>
                    <DatePicker
                        style={{
                            height: canEdit ? 120 : 80
                        }}
                        locale={"ko"}
                        mode={"datetime"}
                        date={time}
                        onDateChange={changeTime}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => setCanEdit(!canEdit)}>
                            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                                {canEdit &&
                                    <ShakingIcon size={20} name={"save"} />
                                }
                                {!canEdit &&
                                    <Icon size={20} name={"edit"} />
                                }
                            </View>
                            <Text style={{ fontSize: 12, marginTop: 3 }}>{canEdit ? "저장" : "편집"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            
        </View>
    )
}
export default TimePicker;