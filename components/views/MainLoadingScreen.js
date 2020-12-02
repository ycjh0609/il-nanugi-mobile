import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button, Animated } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import commonAxios from '../../common/utils/axios/commonAxios';
import globalConfig from '../../common/config/globalConfig';
import SNSLoginTab from '../layouts/main_loading/SNSLoginTab';
import SNSLoginGroup from '../layouts/main_loading/SNSLoginGroup';
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
/* 02) Start Others ***************************************************************************************************************/

const navigateToScreen = async (screenName, navigation) => {
    //await commonAxios.get("/hello");
    // call data by screen type
    // screenName 에 필요한 데이터 先 호출!!
    navigation.navigate(screenName, {
        navigation
    })
}
/* 02) End Others ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const MainLoadingScreen = ({ route, navigation }) => {
    const [userInfo, setUserInfo] = useState({});
    const [loginGroupTabStatus, setLoginGroupTabStatus] = useState(true);
    const {initialScreenName} = route.params;
    
    useEffect(() => {
        if (Object.keys(userInfo).length !== 0) {
            setLoginGroupTabStatus(false);
            let interval = setInterval(()=>{
                navigateToScreen(initialScreenName, navigation);
            },1000);
            return ()=> clearInterval(interval);
        }
    }, [userInfo]);

    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View style={styles.logoContainer}>
            <Text style={styles.mainLogoText}>{globalConfig.brand.logo}</Text>
            <Text style={styles.subLogoText}>{globalConfig.brand.kr}</Text>
            <SNSLoginGroup loginGroupTabStatus={loginGroupTabStatus} setUserInfo={setUserInfo} />
        </View>
    )
    /* 03-1) End View ***************************************************************************************************************/
}
/* 03) End View ***************************************************************************************************************/
export default MainLoadingScreen;