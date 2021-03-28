import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Animated } from "react-native";
import LoginCard from './LoginCard';
import _ from 'lodash';
import { deleteStoreWatcher, useStoreState } from '../../utils/store/commonStore';
 
import OAuth2Service from "../../services/OAuth2Service";
import {OAUTH2_THIRD_PARTY} from "../../services/oauth2-service/OAuth2";

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : SNS Login Container
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    container: {
        width: "80%"
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
function animateMarginTop(target, toValue) {
    Animated.timing(target, {
        toValue: toValue,
        duration: 800,
        useNativeDriver: false
    }).start();
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const LoginCardContainer = ({ }) => {

    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const containerMarginTop = useRef(new Animated.Value(100)).current;
    const indicatorMarginTop = useRef(new Animated.Value(350)).current;

    /***************************
     * 유저정보 Hook 을 이용해서 로그인 컨테이너 animation
    ***************************/
    useEffect(function handleAnimationByUserInfo() {
        if (_.isEmpty(userInfo)) {
            animateMarginTop(containerMarginTop, 250);
        } else {
            animateMarginTop(indicatorMarginTop, 80);
        }
        return () => {
            deleteStoreWatcher(setUserInfo);
        }
    }, [userInfo]);


    const signIn = useCallback((thirdPartyCode)=>{
        OAuth2Service.signIn(thirdPartyCode)
            .then((res)=>{
                console.log("loginContainer: success",res)
                setUserInfo(res);
            }).catch((e)=>{
                console.log("loginContainer: error", e)
            });
    });


    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    if (_.isEmpty(userInfo)) {
        return (
            <Animated.View style={{ marginTop: containerMarginTop, ...styles.container }}>

                <LoginCard iconName="md-subway" title="NAVER" color="green" onPress={()=>signIn(OAUTH2_THIRD_PARTY.Naver)} ></LoginCard>
                <LoginCard iconName="md-swap" title="KAKAO" color="#f7ce16" onPress={()=>signIn(OAUTH2_THIRD_PARTY.Kakao)}></LoginCard>
                <LoginCard iconName="logo-google" title="Google" color="white" onPress={()=>signIn(OAUTH2_THIRD_PARTY.Google)}></LoginCard>
                <LoginCard iconName="logo-facebook" title="FaceBook" color="#2469e0"onPress={()=>signIn(OAUTH2_THIRD_PARTY.FaceBook)} > </LoginCard>

            </Animated.View>
        )
    } else {
        /***************************
        * 유저정보가 있으면 loading 아이콘을 보여주자
        ***************************/
        return (
            <Animated.View style={{ marginTop: indicatorMarginTop }}>
                <ActivityIndicator size="large" color="white"></ActivityIndicator>
            </Animated.View>
        )
    }
}
export default LoginCardContainer;


