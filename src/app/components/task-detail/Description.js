


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'
import Icon from "react-native-vector-icons/FontAwesome5";
import ShakingIcon from "../common/ShakingIcon"
import CodeUtil from '../../utils/code/CodeUtil';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.02.13 
 * Edit By     : kwak ji hoon 
 * Description : Task Detail Description
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row", justifyContent: "center"
        , borderRadius: 10
        , borderWidth: .3

    },
    btnContainer: {
        flexDirection: "column", justifyContent: "center"
    }
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
            <Animated.View style={{
                height: containerHeight, backgroundColor: CodeUtil.TASK_STATUS_CARD_BACK_COLOR.END
                , ...styles.cardContainer, borderColor: CodeUtil.TASK_STATUS_COLOR.END
            }}>
                <View onTouchStart={() => setCanEdit(true)} style={{ flex: 7,flexDirection:"row", justifyContent: "center",padding:20 }}>
                    <TextInput
                        placeholder={"설명없음"}
                        style={{
                            width:"100%"  
                        }}
                        
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
export default Description;