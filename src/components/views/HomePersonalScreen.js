import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TopNav from '../layouts/dash_board/TopNav';
import Card from '../layouts/dash_board/Card';
import PlusCard from '../layouts/dash_board/PlusCard';

import Icon from 'react-native-vector-icons/Ionicons';
import { useStoreState, defineStoreItem } from '../../common/utils/store/commonStore';
/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({
    cardGroupContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    topLogoContainer: {
        margin: 20
    },
    topLogo: {
        color: commonStyle.oneTextColor,
        fontSize: 70,
        textAlign: "center"
    },
    screenContainer: {
        ...commonStyle.screenContainer
        , marginBottom: 250
    }
});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Static Function Group ******************************************************************************************************/
function getPersonalCards() {
    console.log("get")
    let temp = [
        { id: "1", taskStatus: "A", title: "모바일 개발", deadlineTime: "201912312341", cardStyle: { backgroundColor: "#53b5b5" }, isOpen: false },
        { id: "2", taskStatus: "E", title: "꽃님이 산책", deadlineTime: "202011212341", cardStyle: { backgroundColor: "#E2F0CB" }, isOpen: false },
        { id: "3", taskStatus: "A", title: "백엔드 개발", deadlineTime: "202012312341", cardStyle: { backgroundColor: "#C7CEEA" }, isOpen: false },
        { id: "6", taskStatus: "E", title: "경영과학 과제", deadlineTime: "202012311341", cardStyle: { backgroundColor: "#E2F0CB" }, isOpen: false },
        { id: "8", taskStatus: "E", title: "화면개발", deadlineTime: "202012312331", cardStyle: { backgroundColor: "#FF9AA2" }, isOpen: false },

    ]
    return temp;
}
/* 02) End Static Function Group ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const HomePersonalScreen = ({ }) => {
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const [sortType, setSortType] = useState(0);
    const [taskType, setTaskType] = useState(0);
    const [cards, setCards] = useState([]);
    const getSetterEachCard = passedCard => {
        const setCard = (card) => {
            let changedIdx = (cards.findIndex((card) => card.id === passedCard.id));
            cards[changedIdx] = card;
            setCards([...cards]);
        }
        return setCard;
    }
    const reCollocateCards = (cards) => {
        let visible = cards.filter((card) => {
            if (taskType == 0) {
                return true;
            } else {
                return card.taskStatus === "E"
            }
        });
        if (sortType !== 0) {
            visible.sort((a, b) => {
                if (sortType === 1) {
                    return a.id < b.id ? -1 : a.name > b.name ? 1 : 0;
                } else {
                    return a.deadlineTime < b.deadlineTime ? -1 : a.deadlineTime > b.deadlineTime ? 1 : 0;
                }
            });
        }
        return visible;
    }

    useEffect(() => {
        let cards = getPersonalCards();
        setCards(cards);
    }, []);
    useEffect(function afterChangedCollocateType() {

    }, [sortType, taskType]);

    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View style={styles.screenContainer}>
             <TopNav collocate={{ sortType, setSortType, taskType, setTaskType }} />
            <View style={styles.cardGroupContainer}>
                <ScrollView >
                    {reCollocateCards(cards).map((card, idx) => {
                        return <Card
                            idx={idx}
                            key={card.id}
                            card={card}
                            onPress={null}
                            setCard={getSetterEachCard(card)} />
                    })}

                </ScrollView>
            </View>
           


        </View>
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default HomePersonalScreen;