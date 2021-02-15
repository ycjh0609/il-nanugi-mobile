import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Avatar, Badge } from 'react-native-elements';
import StringUtil from "../../utils/string/StringUtil"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CodeUtil from '../../utils/code/CodeUtil';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.02.15
 * Edit By     : kwak ji hoon 
 * Description : Task Detail Participants
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
const Participants = ({ participantsState }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={{ ...styles.cardContainer,backgroundColor: CodeUtil.TASK_STATUS_CARD_BACK_COLOR.END,borderColor:CodeUtil.TASK_STATUS_COLOR.END }}>
            <View style={{flex:7}}>
            <ScrollView horizontal style={{ flexDirection: "row", padding: 10 }}>
                {participantsState.participants.map((p, idx) => {
                    return (
                        <View key={"participants-" + idx} style={{ flexDirection: "column", alignItems: "center", marginRight: 15 }}>
                            <View>
                                <Avatar rounded size={45} overlayContainerStyle={{ backgroundColor: "#b0b3b8" }} title={StringUtil.createSummarizeName(p.name)} />
                                {idx === 0 &&
                                    <Badge containerStyle={{ position: "absolute", top: 0, right: -4 }} status="success" />
                                }
                            </View>
                            <Text style={{ fontSize: 12, textAlign: "center", marginTop: 3 }}>{p.name}</Text>
                        </View>
                    )
                })
                }
            </ScrollView>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.btnContainer}>
                    <TouchableOpacity>
                        <Icon size={20} name={"ellipsis-h"} />
                        <Text style={{ fontSize: 12, marginTop: 5 }}>{"더보기"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Participants;