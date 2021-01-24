import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import moment from "moment";

import commonStyle from '../../../common/styles/commonStyle';
import CommonAvartar from '../common/CommonAvartar';
import CommonBtn from '../common/CommonBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.22
 * Edit By     : kwak ji hoon 
 * Description : Group Card 
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    cardContainer: {
        padding: 10,
        flexDirection: "row"
    },
    groupAvatarContainer: {
        flex: 1, alignItems: "center", justifyContent: "center", marginRight: 20
    }
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
function createGroupName(name) {
    if (!name) return;
    if (name.split(" ").length == 1) {
        return name.split(" ")[0].substring(0, 2);
    } else if (name.split(" ").length > 1) {
        return name.split(" ")[0].substring(0, 1) + "" + name.split(" ")[1].substring(0, 1);
    }
}

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const GroupCard = ({ group, title }) => {

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View>
            <View style={styles.cardContainer}>
                {/* (left) group avatar container */}
                <View style={styles.groupAvatarContainer}>
                    <CommonBtn onPress={() => null} style={commonStyle.shodow}
                        btnStyle={{ btnSize: 70, type: 0, btnBackgroundColor: group.color }}
                        titleStyle={{ name: createGroupName(group.name) }} />
                </View>

                {/* (right) group avatar container */}
                <View style={{ flex: 5, justifyContent: "center", padding: 5 }}>
                    <Text style={{ fontSize: 20 }}>
                        {group.name}
                    </Text>

                    <Text style={{ fontSize: 13, fontWeight: "600", marginTop: 5, color: commonStyle.oneTextColor }}>
                        마지막 수정일: 2021.01.21
                    </Text>

                    <View style={{ paddingTop: 10, flexDirection: "row" }}>

                        {/* 3명의 아바타만 나옴*/}
                        {group.participants.filter((p, idx) => idx < 3).map((participant, idx) => (
                            <View key={"participant-" + idx} style={{ marginRight: 5 }}>
                                <CommonAvartar title={participant.name.substring(0, 2)} />
                            </View>
                        ))}
                        {/* 3명 초과의 참여자가 있으면 ... 아바타로 대체 */}
                        {group.participants.length > 3 &&
                            <View key={"participant-more"} style={{ marginRight: 5 }}>
                                <CommonAvartar title={"..."} />
                            </View>
                        }

                    </View>
                </View>
            </View>
            <View style={{ borderBottomColor: group.color, borderBottomWidth: 1, marginBottom: 5 }}></View>
        </View>
    )
}

export default GroupCard;