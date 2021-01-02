import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Animated, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import commonStyle from '../../../../common/styles/commonStyle';
import CommonAvartar from '../../../common/CommonAvartar';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : card on dashboard
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        marginBottom: 20,
        paddingTop: 11,
        paddingLeft: 20,
        paddingRight: 20,
    },
    circle: {
        width: 38,
        height: 38,
        borderRadius: 38 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
function anmaite(target, toValue, duration) {
    Animated.timing(target, {
        toValue,
        duration,
        useNativeDriver: false //뭔지 모르겠는데, 없으면 에러남
    }).start();
}
function createContentName(name){
    if (name.split(" ").length == 1){
        return name.split(" ")[0].substring(0,2);
    }else if (name.split(" ").length > 1){
        return name.split(" ")[0].substring(0,1) + name.split(" ")[1].substring(0,1);
    }
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const Card = ({ onPress, card, setCard,idx ,children}) => {
    const cardHeight = useRef(new Animated.Value(20)).current;
    const btnSpinValue = useRef(new Animated.Value(0)).current;
    /***************************
     * Card 열림/닫힘 제어 (부모 Component에서 수신받은 setter 로 적용)
    ***************************/
    const changeOpenStatus = useCallback(() => {
        setCard({ ...card, isOpen: !card.isOpen });
    });

    /***************************
     * 카드 열림/닫힘에 따른 애니메이션 제어 Hook
    ***************************/
    useEffect(function handleCardShape() {
        if (card.isOpen) {
            anmaite(cardHeight, 210, 400);
            anmaite(btnSpinValue,1,400);
        } else {
            anmaite(cardHeight, 60, 400);
            anmaite(btnSpinValue,0,400);
        }
        
    }, [card.isOpen]);

    /***************************
     * 부모 컴퍼넌트에서 카드 그룹이 재배치되면 idx가 변경되고 그 변경을 받아 첫번째 카드라면 카드를 연다
    ***************************/
    useEffect(function handleInitialCardOpenStatus() {
        card.isOpen = idx == 0 ? true : false;
        setCard({ ...card });
    }, [idx])

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <Animated.View style={{ ...styles.cardContainer, backgroundColor: card.color, height: cardHeight }}>
            <View style={{...commonStyle.rowAlignment}}>
                <View style={{...styles.circle}}>
                <CommonAvartar title={createContentName(card.group.name)}/>
                </View>
                <View onPress={onPress} style={{ width: 250}}>
                    <Text style={{ fontSize: 18 }} >{card.title}</Text>
                </View>
                <Animated.View style={{ alignItems: "flex-end",
                                        marginRight:5,
                                        transform: [{rotate:btnSpinValue.interpolate({
                                            inputRange:[0,1],
                                            outputRange:["0deg","360deg"]
                                        })}] }} >
                    <Icon onPress={changeOpenStatus} name="md-add-circle" size={30} />
                </Animated.View>
            </View>
            {children}
        </Animated.View >
    )
}
export default Card;