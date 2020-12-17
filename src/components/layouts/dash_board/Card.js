import React, { useRef, useState, useEffect } from 'react';
import { Animated, ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Badge } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons"
import CommonAvartar from '../../common/CommonAvartar';
const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        marginBottom: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
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
    timeWrapper: {
        alignItems: "center", backgroundColor: "black", width: 30, borderRadius: 6
    },
    timeText: {
        fontSize: 18,
        color: "white",
        fontWeight: "600"
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
    bottom: {
    }
});
function anmaiteCardHeight(target, toValue, duration) {
    Animated.timing(target, {
        toValue,
        duration,
        useNativeDriver: false //뭔지 모르겠는데, 없으면 에러남
    }).start();
}
function convertTaskStatusToTexts(taskStatus){
    if (taskStatus === "E") return "완료";
    else return "진행";
}


const Card = ({ onPress, card, setCard, idx }) => {
    const cardHeight = useRef(new Animated.Value(20)).current;
    const changeOpenStatus = () => {
        setCard({ ...card, isOpen: !card.isOpen });
    }
    useEffect(function handleCardHeight() {
        if (card.isOpen) {
            anmaiteCardHeight(cardHeight, 210, 400);
        } else {
            anmaiteCardHeight(cardHeight, 60, 400);
        }
    }, [card.isOpen]);
    useEffect(function handleInitialCardOpenStatus() {
        card.isOpen = idx == 0 ? true : false;
        setCard({ ...card });
    }, [idx])

    return (
        <Animated.View style={{ ...styles.cardContainer, ...card.cardStyle, height: cardHeight }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10
            }}>
                <CommonAvartar />
                <View onPress={onPress} style={{ width: 250}}>
                    <Text style={{ fontSize: 18 }} >{card.title}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }} >
                    <Icon onPress={changeOpenStatus} name="md-add-circle" size={20} />
                </View>
            </View>

            <View style={{ ...styles.cardDetail, display: (card.isOpen ? "" : "none") }}>

                <View style={{
                    ...styles.rowCenter,
                    paddingLeft: 40,
                    paddingRight: 40,
                    paddingBottom: 20
                }}>
                    <View style={styles.columnCenter}>
                        <View style={{ ...styles.circle }}>
                            <Icon name="ios-document" style={{ color: "white" }} size={25} />
                        </View>
                        <Badge
                            status="error" value="5" badgeStyle={{ size: 10 }} textStyle={{ fontSize: 13 }}
                            containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                        />
                        <Text style={{ marginTop: 5 }}>보드1</Text>
                    </View>
                    <View style={styles.columnCenter}>
                        <View style={{ ...styles.circle }}>
                            <Icon name="logo-ionitron" style={{ color: "white" }} size={25} />
                        </View>
                        <Text style={{ marginTop: 5 }}>보드2</Text>
                    </View>
                    <View style={styles.columnCenter}>
                        <Badge
                            status="error" value="5" badgeStyle={{ size: 10 }} textStyle={{ fontSize: 13 }}
                            containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                        />
                        <View style={{ ...styles.circle }}>
                            <Icon name="logo-javascript" style={{ color: "white" }} size={25} />
                        </View>
                        <Text style={{ marginTop: 5 }}>보드3</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 0,
                    ...styles.rowCenter
                }} >
                    <View style={{
                        ...styles.columnCenter
                    }}>
                        <View style={{
                            ...styles.rowCenter
                        }}>
                            <View style={{ ...styles.timeWrapper }}>
                                <Text style={styles.timeText}>12</Text>
                            </View>
                            <View style={{ ...styles.timeWrapper, marginRight: 10, marginLeft: 10 }}>
                                <Text style={styles.timeText}>03</Text>
                            </View>
                            <View style={{ ...styles.timeWrapper }}>
                                <Text style={styles.timeText}>47</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 13 }}>Day    Hour    Min</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 25 }}>{convertTaskStatusToTexts(card.taskStatus)}</Text>
                    </View>
                </View>
            </View>
        </Animated.View >
    )
}
export default Card;