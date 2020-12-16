import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import commonStyle from "../../common/styles/commonStyle";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TopNav from '../layouts/dash_board/TopNav';
import Card from '../layouts/dash_board/Card';
import PlusCard from '../layouts/dash_board/PlusCard';
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
        , marginBottom: 200
    }
});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Static Function Group ******************************************************************************************************/
function getGroupCards() {
    console.log("get")
    let temp = [

        { id: "6", title: "경영과학 과제하기", cardStyle: { backgroundColor: "#E2F0CB" }, isOpen: false },
        { id: "7", title: "어플 개발하기", cardStyle: { backgroundColor: "#C7CEEA" }, isOpen: false },
        { id: "8", title: "어플 개발하기2", cardStyle: { backgroundColor: "#FF9AA2" }, isOpen: false },
        { id: "1", title: "자차카타파타하", cardStyle: { backgroundColor: "#F287f5" }, isOpen: false },
        { id: "2", title: "경영과학 과제하기", cardStyle: { backgroundColor: "#E2F0CB" }, isOpen: false },
        { id: "3", title: "어플 개발하기", cardStyle: { backgroundColor: "#C7CEEA" }, isOpen: false },
        { id: "4", title: "어플 개발하기2", cardStyle: { backgroundColor: "#FF9AA2" }, isOpen: false },
        { id: "5", title: "어플 개발하기", cardStyle: { backgroundColor: "#C7CEEA" }, isOpen: false },
        { id: "9", title: "어플 개발하기", cardStyle: { backgroundColor: "#C7CEEA" }, isOpen: false }
    ]
    return temp;
}
function sort(a, b) {

}
/* 02) End Static Function Group ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const HomeGroupScreen = ({ }) => {
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
                return card.title === "어플 개발하기"
            }
        });
        if (sortType !== 0) {
            visible.sort((a, b) => {
                if (sortType === 1) {
                    return a.id < b.id ? -1 : a.name > b.name ? 1 : 0;
                } else {
                    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
                }
            });
        }
        return visible;
    }

    useEffect(() => {
        let cards = getGroupCards();
        setCards(cards);
    }, []);
    useEffect(function afterChangedCollocateType() {

    }, [sortType, taskType]);

    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View style={styles.screenContainer}>
            <TopNav collocate={{ sortType, setSortType, taskType, setTaskType }} />
            <PlusCard/>
            <ScrollView style={styles.cardGroupContainer}>
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
    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default HomeGroupScreen;