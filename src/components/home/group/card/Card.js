import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Animated, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import CommonAvartar from '../../../common/CommonAvartar';
const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        marginBottom: 20,
        paddingTop: 11,
        paddingLeft: 20,
        paddingRight: 20,
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    columnCenter: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    circle: {
        width: 37,
        height: 37,
        borderRadius: 37 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
});
function anmaiteCardHeight(target, toValue, duration) {
    Animated.timing(target, {
        toValue,
        duration,
        useNativeDriver: false //뭔지 모르겠는데, 없으면 에러남
    }).start();
}

const Card = ({ onPress, card, setCard, idx ,children}) => {
    const cardHeight = useRef(new Animated.Value(20)).current;
    
    /***************************
     * Card 열림/닫힘 제어 (부모 Component에서 수신받은 setter 로 적용)
    ***************************/
    const changeOpenStatus = useCallback(() => {
        setCard({ ...card, isOpen: !card.isOpen });
    });

    /***************************
     * 카드 열림/닫힘에 따른 애니메이션 제어 Hook
    ***************************/
    useEffect(function handleCardHeight() {
        if (card.isOpen) {
            anmaiteCardHeight(cardHeight, 210, 400);
        } else {
            anmaiteCardHeight(cardHeight, 60, 400);
        }
    }, [card.isOpen]);

    /***************************
     * 부모 컴퍼넌트에서 카드 그룹이 재배치되면 idx가 변경되고 그 변경을 받아 첫번째 카드라면 카드를 연다
    ***************************/
    useEffect(function handleInitialCardOpenStatus() {
        card.isOpen = idx == 0 ? true : false;
        setCard({ ...card });
    }, [idx])

    return (
        <Animated.View style={{ ...styles.cardContainer, ...card.cardStyle, height: cardHeight }}>
            <View style={{
                ...styles.rowCenter,
            }}>
                <View style={{...styles.circle}}>
                <CommonAvartar />
                </View>
                <View onPress={onPress} style={{ width: 250}}>
                    <Text style={{ fontSize: 18 }} >{card.title}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }} >
                    <Icon onPress={changeOpenStatus} name="md-add-circle" size={20} />
                </View>
            </View>
            {children}
        </Animated.View >
    )
}
export default Card;