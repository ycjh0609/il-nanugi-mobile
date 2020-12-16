import React, { useRef, useState, useEffect } from 'react';
import { Animated, ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import CommonAvartar from '../../common/CommonAvartar';
const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        marginBottom: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,

    }
});
function anmaiteCardHeight(target, toValue, duration) {
    Animated.timing(target, {
        toValue,
        duration,
        useNativeDriver: false //뭔지 모르겠는데, 없으면 에러남
    }).start();
}


const Card = ({ onPress, card, setCard, idx }) => {
    const cardHeight = useRef(new Animated.Value(20)).current;

    const changeOpenStatus = () => {
        setCard({ ...card, isOpen: !card.isOpen });
    }

    useEffect(function handleInitialCardOpenStatus(){
        card.isOpen = idx == 0 ? true : false;
        setCard({ ...card });
    }, [idx])
    useEffect(function handleCardHeight() {
        if (card.isOpen) {
            anmaiteCardHeight(cardHeight, 200, 400);
        } else {
            anmaiteCardHeight(cardHeight, 60, 200);
        }
    }, [card.isOpen]);
    return (
        <Animated.View style={{ ...styles.cardContainer, ...card.cardStyle, height: cardHeight }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <CommonAvartar />
                <View onPress={onPress} style={{ width: 250 }}>
                    <Text style={{ fontSize: 15 }} >{card.title}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }} >
                    <Icon onPress={changeOpenStatus} name="md-add-circle" size={20} />
                </View>
            </View>
        </Animated.View >
    )
}
export default Card;