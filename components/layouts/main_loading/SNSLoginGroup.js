import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Animated } from "react-native";
import SNSLoginTab from './SNSLoginTab';
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({
    container: {
        width: "80%"
    }
});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Others ***************************************************************************************************************/

/* 02) End Others ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const SNSLoginGroup = ({ loginGroupTabStatus, setUserInfo }) => {

    const top = useRef(new Animated.Value(100)).current;
    useEffect(() => {
        Animated.timing(top, {
            toValue: 300,
            duration: 800,
            useNativeDriver: false //뭔지 모르겠는데, 없으면 에러남
        }).start();
    }, [loginGroupTabStatus]);

    if (loginGroupTabStatus) {
        return (
            <Animated.View style={{ ...{ marginTop: top }, ...styles.container }}>

                <SNSLoginTab iconName="md-subway" title="NAVER" color="green" onPress={() => setUserInfo({ name: "곽" })} ></SNSLoginTab>
                <SNSLoginTab iconName="md-swap" title="KAKAO" color="#f7ce16"></SNSLoginTab>
                <SNSLoginTab iconName="logo-google" title="Google" color="white"></SNSLoginTab>
                <SNSLoginTab iconName="logo-facebook" title="FaceBook" color="#2469e0"></SNSLoginTab>

            </Animated.View>
        )
    } else {
        return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="white"></ActivityIndicator>;
    }
}
/* 03) End View ***************************************************************************************************************/
export default SNSLoginGroup;


