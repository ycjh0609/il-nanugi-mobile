


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'
import moment from "moment"
import Icon from "react-native-vector-icons/FontAwesome5";
import ShakingIcon from "../common/ShakingIcon"
import CodeUtil from '../../utils/code/CodeUtil';
import { isNil } from 'lodash';
import { Button } from 'react-native-elements';
import commonStyle from '../../styles/commonStyle';
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
        borderRadius: 30
        
        
       
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
const TimePicker = ({ timeState,onCancle }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const containerHeight = useRef(new Animated.Value(165)).current;
    const [canEdit, setCanEdit] = useState(true);
    const [time, setTime] = useState(new Date());

    const changeTime = useCallback((date) => {
        setTime(date);
    });
    useEffect(() => {
        setTime(moment(timeState.time, 'YYYYMMDDhhmm').toDate())
    }, [timeState]);
    useEffect(() => {
        if (!canEdit){
            timeState.setTime(moment(time).format("YYYYMMDDhhmm"));
            onCancle();
        }
    }, [canEdit]);
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={{
            ...styles.container, backgroundColor: "#dcdce3",height:200
        }}>
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
                            height: 160
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

            <Button title={"취소"} containerStyle={{backgroundColor:commonStyle.backgroundColor}} onPress={onCancle}/>
        </View>
    )
}
export default TimePicker;