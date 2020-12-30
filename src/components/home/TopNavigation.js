import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Alert } from 'react-native';

import CommonAvartar from '../common/CommonAvartar';
import { deleteStoreWatcher, useStoreState } from '../../common/utils/store/commonStore';
import commonStyle from '../../common/styles/commonStyle'
import CommonBtn from '../common/CommonBtn';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.26 
 * Edit By     : kwak ji hoon 
 * Description : Home Top Navigator
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    container:{
        paddingTop:55, //for ios, 안드로이드를 어떻게 할지 고민해야함 (todo)
        height:130,
        backgroundColor: commonStyle.oneBackgroundColor,
    },
    navigatorMenus:{
        ...commonStyle.rowAlignment,
        paddingLeft:25,
        paddingRight:25
    },
    logoContainer:{
        ...commonStyle.rowCenter,
        flex:1
    },
    logoText:{
        color:commonStyle.oneTextInColor,
        fontSize:30,
        fontWeight:"700",
    },
    userNameContainer:{
        ...commonStyle.rowCenter,
        flex:3
    },
    userNameText:{
        margin:5,
        color:commonStyle.oneTextInColor,
        fontSize:20,
        fontWeight:"600",
    },
    alramBtnContainer:{
        ...commonStyle.rowCenter,
        flex:1,
    }
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TopNavigation = () => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const _onPressAlarmBtn = useCallback(()=>{
        Alert.alert("alram")
    });
    /*--------------------------------`-----------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>
            <View style={styles.navigatorMenus}>
                {/* Logo Text */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>1÷</Text>
                </View>
                <View style={styles.userNameContainer}>
                    <CommonAvartar title={userInfo.name.substring(0,1)} />
                    <Text style={styles.userNameText}>{userInfo.name}</Text>
                </View>
                <View style={styles.alramBtnContainer}>
                    <CommonBtn onPress={_onPressAlarmBtn} btnStyle={{btnSize:40,type:0}} iconStyle={{name:"md-bulb"}}/>
                </View>
            </View>
        </View>
    )
}
export default TopNavigation;