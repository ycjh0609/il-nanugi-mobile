import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import commonStyle from '../../../common/styles/commonStyle';
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
    cardWrapper: {
        flex: 1,
        margin: 7,
        ...commonStyle.shodow
    },
    cardContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 25,
        height: 100,
    },
    cardInnerTitle: {
        fontSize: 25
    },
    cardBottomTitle:{
        textAlign:"center",
        marginTop:5,
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
        return name.split(" ")[0].substring(0, 1) + " " + name.split(" ")[1].substring(0, 1);
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
        <View style={styles.cardWrapper}>
            {!group.isEmpty &&
                <View>
                    <TouchableOpacity onPress={() => console.log("123")}
                        activeOpacity={0.6} style={{ ...styles.cardContainer, borderColor: group.color }}>
                        <View>
                            <Text style={styles.cardInnerTitle}>{createGroupName(title)}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.cardBottomTitle}>{title}</Text>
                </View>
            }
        </View>
    )
}

export default GroupCard;