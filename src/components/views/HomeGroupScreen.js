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
        , marginBottom: 350
    }
});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Static Function Group ******************************************************************************************************/
function getGroupCards() {
    console.log("get")
    let temp = [

        { id: "6", taskStatus: "E", title: "일나누기 프로젝트", deadlineTime: "202012311341", cardStyle: { backgroundColor: "#E2F0CB" }, isOpen: false },
        { id: "2", taskStatus: "E", title: "SweetHome", deadlineTime: "202011212341", cardStyle: { backgroundColor: "#E2F0CB" }, isOpen: false },
        { id: "3", taskStatus: "A", title: "경영과학 2조", deadlineTime: "202012312341", cardStyle: { backgroundColor: "#C7CEEA" }, isOpen: false },
       
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
            
            <View style={styles.cardGroupContainer}>
                <PlusCard/>
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
export default HomeGroupScreen;