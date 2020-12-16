import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import HomeHeader from '../layouts/home/HomeHeader';
import HomePersonalScreen from './HomePersonalScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import HomeGroupScreen from './HomeGroupScreen';
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({

});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Static Function Group ******************************************************************************************************/

/* 02) End Static Function Group ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const HomeScreen = () => {
    const { width, height } = Dimensions.get("window");
    const [ pageNum, setPageNum ] = useState(0);

    const onScrollEnd = e => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let num = Math.floor(contentOffset.x / viewSize.width);
        setPageNum(num);
    }

    useEffect(() => {
        console.log(pageNum)
    }, [pageNum]);
    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View >
            <HomeHeader pageNum={pageNum} />
            <ScrollView
                horizontal
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
            >
                <View style={{ width }}>
                    <HomePersonalScreen />
                </View>
                <View style={{ width }}>
                    <HomeGroupScreen />
                </View>
            </ScrollView>


        </View>
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default HomeScreen;