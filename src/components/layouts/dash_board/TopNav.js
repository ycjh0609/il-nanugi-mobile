import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
    topNavContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#eee',
        borderBottomWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10
    },

});
const TopNav = ({collocate}) => {
    
    useEffect(() => {
        
    }, []);

    return (
        <View style={styles.topNavContainer}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Icon onPress={()=>collocate.setTaskType(1)} name="ios-list" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>전체 할 일</Text>
            </View>

            <View>
                <Icon onPress={()=>collocate.setSortType(2)} name="md-reorder" size={30} />
            </View>
        </View>
    )
}
export default TopNav;