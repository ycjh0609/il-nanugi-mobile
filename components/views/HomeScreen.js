import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import globalConfig from '../../common/config/globalConfig';
import DashBoardScreen from './DashBoardScreen';
import ChatScreen from './ChatScreen';

/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({

});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Others ***************************************************************************************************************/

/* 02) End Others ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const HomeScreen = () => {
    const changeScreen = (screen) => setScreen(screen);
    const [screen,setScreen] = useState(<DashBoardScreen changeScreen={changeScreen}/>);
    useEffect(() => {
        
    }, []);
    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View style={{height:"100%"}}>
           {screen}
        </View>
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default HomeScreen;