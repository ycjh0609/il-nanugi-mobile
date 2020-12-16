import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button, Animated } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import commonAxios from '../../common/utils/axios/commonAxios';
import globalConfig from '../../common/config/globalConfig';
import SNSLoginGroup from '../layouts/main_login/SNSLoginGroup';
import _ from 'lodash';
import {useStoreState,defineStoreItem,deleteStoreWatcher} from '../../common/utils/store/commonStore';
/* 01) Start Style ***************************************************************************************************************/
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
        fontSize: 15,
        fontWeight: "bold"
    }
});
/* 01) End Style ***************************************************************************************************************/


/* 02) Start Static Function Group ******************************************************************************************************/
function hasUserInfo(userInfo){
    //to-do: 단말에서 유저정보 읽어야함
    if (_.isEmpty(userInfo)){
        return false;
    }else{
        return true;
    }
}
async function navigateToScreen(name, navigation, params){
    //await commonAxios.get("/hello");
    // call data by screen type
    // screenName 에 필요한 데이터 先 호출!!
    navigation.reset({
        routes: [{ name,params }],
    });
    //navigation.navigate(screenName, params);
}
/* 02) End Static Function Group ***************************************************************************************************************/


/* 03) Start React ***************************************************************************************************************/
const MainLoginScreen = ({ route, navigation }) => {
  
    defineStoreItem("userInfo",{},{set:(key,value)=>console.log("변경되었습니다~",key,value)}); 
    const [userInfo, setUserInfo] = useStoreState("userInfo",useState);
    const {initialScreenName} = route.params; // App.js 에서 넘겨받은 최초 스크린
   
    useEffect(() => {
        let timer;
        if (!_.isEmpty(userInfo)) {
            let initialTabName = "HomeScreen"; // 임시로 하드코딩 처리        
            timer = setTimeout(()=>{
                navigateToScreen(initialScreenName, navigation, {userInfo,initialTabName});
            },1000);
        }
        return ()=>{
            deleteStoreWatcher(setUserInfo);
            clearTimeout(timer);
        } 
    }, [userInfo]);


    /* 03-1) Start View ***************************************************************************************************************/
    return (
        <View style={styles.logoContainer}>

            <Text style={styles.mainLogoText}>{globalConfig.brand.logo} </Text>
            <Text style={styles.subLogoText}>{globalConfig.brand.kr}</Text>
            <SNSLoginGroup/>
        </View>
    )
    /* 03-1) End View ***************************************************************************************************************/


}
/* 03) End React ***************************************************************************************************************/
export default MainLoginScreen;