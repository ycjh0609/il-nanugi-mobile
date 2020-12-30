import React, { useRef, useState, useEffect } from 'react';
import { Animated, ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";

import Card from "./Card";
const styles = StyleSheet.create({
    cardDetail: {
        paddingTop: 10,

    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0c5063"
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
});

const GroupCard = ({ card, setCard, idx }) => {


    return (
        <Card card={card} setCard={setCard} idx={idx}>
            
            <Text>test</Text>
        </Card >
    )
}
export default GroupCard;