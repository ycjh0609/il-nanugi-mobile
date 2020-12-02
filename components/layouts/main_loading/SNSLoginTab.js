import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* 01) Start Style ***************************************************************************************************************/
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
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Others ***************************************************************************************************************/

/* 02) End Others ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
const SNSLoginTab = ({ onPress, title, color, iconName }) => {
    useEffect(() => {

    }, []);
    if (!color) color = "green"
    /* 03-1) End View ***************************************************************************************************************/
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...styles.tabContainer, ...{ backgroundColor: color } }}>
                <Text style={{ fontSize: 13, fontWeight: "700" }}>
                    <Ionicons name={iconName} size={20} />
                    {"  "} {title} 로 로그인
            </Text>
            </View>
        </TouchableOpacity>
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default SNSLoginTab;