import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : SNS Login Card
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    tabContainer: {
        borderRadius: 10,
        height: 45,
        backgroundColor: "#ced1c2",
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
* 03) React
*----------------------------------------------------------------------------------*/
const LoginCard = ({ onPress, title, color, iconName }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    useEffect(() => {

    }, []);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={{ ...styles.tabContainer, backgroundColor: color }}>
                <Text style={{ fontSize: 13, fontWeight: "700" }}>
                    <Ionicons name={iconName} size={20} />
                    {"  "} {title} 로 로그인
            </Text>
            </View>
        </TouchableOpacity>
    )
}
export default LoginCard;