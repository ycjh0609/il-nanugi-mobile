import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button, Animated } from "react-native";
import _ from 'lodash';

import commonStyle from "../styles/commonStyle";
import commonConfig from "../config/commonConfig";
import { useStoreState, defineStoreItem, deleteStoreWatcher } from '../utils/store/commonStore';
import LoginCardContainer from '../components/login/LoginCardContainer';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27 
 * Edit By     : kwak ji hoon 
 * Description : Login Screen (로그인)
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    logoContainer: {
        backgroundColor: commonStyle.oneBackgroundColor,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainLogoText: {
        color: commonStyle.oneTextInColor,
        fontSize: 50,
        fontWeight: "bold"
    },
    subLogoText: {
        color: commonStyle.oneTextInColor,
        fontSize: 20,
        fontWeight: "bold"
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
/***************************
 * todo
***************************/
async function navigateToScreen(name, navigation, params) {
    //await commonAxios.get("/hello");
    // call data by screen type
    // screenName 에 필요한 데이터 先 호출!!
    navigation.reset({
        routes: [{ name, params }],
    });
    //navigation.navigate(screenName, params);
}

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const LoginScreen = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    /***************************
     * Global Store 에 유저정보 Hook 을 저장한다
    ***************************/
    defineStoreItem("userInfo", {}, { set: (key, value) => console.log("변경되었습니다~", key, value) });
    const { initialScreenName } = route.params; // App.js 에서 넘겨받은 최초 스크린
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);

    /***************************
     * 01) 유저정보 체크 Hook (유저 정보가 생성되면 initialTabName 으로 전환)
    ***************************/
    useEffect(() => {
        let timer;
        if (!_.isEmpty(userInfo)) {
            let initialTabName = "HomeNavigatorScreen"; // 임시로 하드코딩 처리        
            timer = setTimeout(() => {
                //로그인 요청은 3rd Party 에 요청할 것이니 시간이 걸릴것임, 임시로 timer 걸자
                navigateToScreen(initialScreenName, navigation, { userInfo, initialTabName });
            }, 1000);
        }
        return () => {
            deleteStoreWatcher(setUserInfo); // 로그인 화면은 다시 이용하지 않을것이니 삭제
            clearTimeout(timer);
        }
    }, [userInfo]);


    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.logoContainer}>
            <Text style={styles.mainLogoText}>{commonConfig.brand.logo} </Text>
            <Text style={styles.subLogoText}>{commonConfig.brand.kr}</Text>
            <LoginCardContainer />
        </View>
    )
}
export default LoginScreen;