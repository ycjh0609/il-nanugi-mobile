


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'
import Icon from "react-native-vector-icons/FontAwesome5";
import ShakingIcon from "../common/ShakingIcon"
import CodeUtil from '../../utils/code/CodeUtil';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.02.13 
 * Edit By     : kwak ji hoon 
 * Description : Task Detail Description
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
const Description = ({ descriptionState }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
   const containerHeight = useRef(new Animated.Value(60)).current;
   const [canEdit, setCanEdit] = useState(false);
  
    useEffect(() => {
       Animated.timing(containerHeight, {
           toValue: canEdit ? 60 : 60,
           duration: 300,
           useNativeDriver: false
       }).start();
   }, [canEdit]);
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View>
            <Animated.View style={{ height: containerHeight, flexDirection: "row", justifyContent: "center", backgroundColor: CodeUtil.TASK_STATUS_CARD_BACK_COLOR.DOING, borderRadius: 10, borderTopRightRadius: 0 }}>
                <View onTouchStart={() => setCanEdit(true)} style={{ flex: 7, justifyContent: "center" }}>
                   
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
export default Description;