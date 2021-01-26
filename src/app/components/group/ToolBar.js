import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeArea } from 'react-native-safe-area-context';
import commonStyle from '../../styles/commonStyle';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.22
 * Edit By     : kwak ji hoon 
 * Description : Group Dashboard Top Navigation 
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    topNavContainer: {
        width: '100%',
        borderColor: '#eee',
        borderBottomWidth: 0.5,

        marginTop: 10,
        marginBottom: 20,
        ...commonStyle.rowAlignment
    },
    textType01: {
        fontSize: 30,
        fontWeight: "800"
    },
    textType02: {
        fontSize: 18,
        fontWeight: "600"
    }

});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ToolBar = ({ groupsState }) => {
    
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.topNavContainer}>
            <View >
                <View style={{ flexDirection: 'row', }}>
                    <Text style={styles.textType01}>그룹</Text>
                    <Text style={styles.textType02}> Group List</Text>
                </View>
                <View style={{ borderBottomWidth: 1, width: 160, marginTop: 10 }}></View>
            </View>
            <View>
            <TouchableOpacity activeOpacity={0.6} style={commonStyle.rowAlignment}>
                <Icon name="group" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 16 }}>{groupsState.groups.length + ""}</Text>
            </TouchableOpacity>
            <View style={{  marginTop: 10 }}></View>
            </View>
        </View>
    )
}

export default ToolBar;