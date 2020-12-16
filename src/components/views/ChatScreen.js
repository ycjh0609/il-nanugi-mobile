import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({

});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Static Function Group ******************************************************************************************************/

/* 02) End Static Function Group ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const ChatScreen = () => {

    const { width, height } = Dimensions.get("window");
    useEffect(() => {

    }, []);
    /* 03-1) End View ***************************************************************************************************************/
    return (
            <ScrollView
                horizontal
                // contentContainerStyle={{ width: `${100 * intervals}%` }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
            >
                <View style={{marginTop:200,width}}>
                    <Text>123</Text>
                </View>

                <View style={{marginTop:200,width}}>
                    <Text>567</Text>
                </View>
            </ScrollView>
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default ChatScreen;