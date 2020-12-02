import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import globalConfig from '../../common/config/globalConfig';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TopNav from '../layouts/home/TopNav';
import Card from '../layouts/home/Card';
import PlusCard from '../layouts/home/PlusCard';
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
const HomeScreen = ({navigation}) => {
    useEffect(() => {

    }, []);
    /* 03-1) End View ***************************************************************************************************************/
    return (
        <ScrollView>
            <View style={styles.screenContainer}>
                <View style={styles.topLogoContainer}>
                    <Text style={styles.topLogo} onPress={() => Alert.alert('long')}>{globalConfig.brand.logo}</Text>
                </View>
                <TopNav />
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
export default HomeScreen;