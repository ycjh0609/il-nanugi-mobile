import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View,Button } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import globalConfig from '../../common/config/globalConfig';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TopNav from '../layouts/dash_board/TopNav';
import Card from '../layouts/dash_board/Card';
import PlusCard from '../layouts/dash_board/PlusCard';
import SettingScreen from './SettingScreen';
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({
    cardGroupContainer: {
        margin: 10
    },
    topLogoContainer: {
        margin: 20
    },
    topLogo: {
        color: commonStyle.oneTextColor,
        fontSize: 70,
        textAlign: "center"
    },
    screenContainer: commonStyle.screenContainer
});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Others ***************************************************************************************************************/

/* 02) End Others ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const DashBoardScreen = ({changeScreen}) => {
    useEffect(() => {

    }, []);
    /* 03-1) End View ***************************************************************************************************************/
    return (
        <ScrollView>
            <View style={styles.screenContainer}>
                <View style={styles.topLogoContainer}>
                    <Text style={styles.topLogo}>{globalConfig.brand.logo}</Text>
                </View>
                <TopNav />
                {/* <Button title="test" onPress={()=>changeScreen(<SettingScreen/>)} ></Button> */}
                <View style={styles.cardGroupContainer}>
                    <Card cardStyle={{backgroundColor:"#FF9AA2",height:100}}/>
                    <Card cardStyle={{backgroundColor:"#E2F0CB",height:100}}/>
                    <Card cardStyle={{backgroundColor:"#C7CEEA",height:100}}/>
                    <PlusCard />
                </View>
            </View>
        </ScrollView>
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default DashBoardScreen;