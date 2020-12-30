import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Badge } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({
    circle: {
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0c5063"
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    columnCenter: {

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Static Function Group ******************************************************************************************************/

/* 02) End Static Function Group ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const TaskDetail = ({ card }) => {
    useEffect(() => {

    }, []);
    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View style={{
            ...styles.rowCenter,
            paddingLeft: 40,
            paddingRight: 40,
            paddingBottom: 20
        }}>
            <View style={styles.columnCenter}>
                <View style={{ ...styles.circle }}>
                    <Icon name="ios-document" style={{ color: "white" }} size={25} />
                </View>
                <Badge
                     status="error" value="5" width={30} textStyle={{ fontSize: 12,fontWeight: "600" }}
                    containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                />
                <Text style={{ marginTop: 5 }}>보드1</Text>
            </View>

            <View style={styles.columnCenter}>
                <View style={{ ...styles.circle }}>
                    <Icon name="md-person" style={{ color: "white" }} size={25} />
                </View>
                <Text style={{ marginTop: 5 }}>보드2</Text>
            </View>

            <View style={styles.columnCenter}>
                <View style={{ ...styles.circle }}>
                    <Icon name="ios-musical-notes" style={{ color: "white" }} size={25} />
                </View>
                <Text style={{ marginTop: 5 }}>보드3</Text>
                <Badge
                    status="error" value="5" width={30} textStyle={{ fontSize: 12,fontWeight: "600" }}
                    containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                />
            </View>
        </View>
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default TaskDetail;