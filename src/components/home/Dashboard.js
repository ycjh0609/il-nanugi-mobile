import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

import PersonalDashboard from "./personal/PersonalDashboard"
import GroupDashboard from './group/GroupDashboard';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : Home CardContainer
 *----------------------------------------------------------------------------------*/

const styles = StyleSheet.create({

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value])
    return ref.current;
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const Dashboard = ({ navigation, route, tasks, groups, currentPage, setCurrentPage }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const scrollPosition = useRef();
    /***************************
     * 수평 스크롤 페이징 처리 (Personal, Group)
    ***************************/
    const onScrollEnd = useCallback((e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let num = Math.floor(contentOffset.x / viewSize.width); //offset을 스크롤 View 의 Width 로 나눠 pagenumber 계산
        num = num < 0 ? 0 : num;
        setCurrentPage(num);
    });
    useEffect(() => {
        if (currentPage == 0) {
            scrollPosition.current.scrollTo({ y: 0, x: 0, animated: true });
        } else if (currentPage == 1) {
            scrollPosition.current.scrollToEnd({ animated: true });
        }
    }, [currentPage])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View >
            <ScrollView
                ref={scrollPosition}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"

            >
                <View style={{ width: WINDOW_WIDTH }}>
                    <PersonalDashboard navigation={navigation} tasks={tasks} groups={groups} />
                </View>
                <View style={{ width: WINDOW_WIDTH }}>
                    <GroupDashboard groups={groups} />
                </View>
            </ScrollView>
        </View>)
}
export default Dashboard;