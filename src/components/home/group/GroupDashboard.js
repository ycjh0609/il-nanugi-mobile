import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import commonStyle from "../../../common/styles/commonStyle";
import { useStoreState, defineStoreItem } from '../../../common/utils/store/commonStore';
import GroupCard from './card/GroupCard';
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

        { id: "6", taskStatus: "E", title: "일나누기 프로젝트", deadlineTime: "202012311341", cardStyle: { backgroundColor: "#E2F0CB" } },
        { id: "2", taskStatus: "E", title: "SweetHome", deadlineTime: "202011212341", cardStyle: { backgroundColor: "#E2F0CB" } },
        { id: "3", taskStatus: "A", title: "경영과학 2조", deadlineTime: "202012312341", cardStyle: { backgroundColor: "#C7CEEA" } },
       
    ]
    return temp;
}

/* 02) End Static Function Group ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const GroupDashboard = ({ groups}) => {
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const [cards, setCards] = useState([]);

    /***************************
     * 렌더링 될 각 카드에 전달할 각 카드 setter 생성 
    ***************************/
    const getSetterEachCard = passedCard => {
        // 각 카드가 변경되어 setCard가 호출되면 카드 전체를 setter로 변경
        const setCard = (card) => {
            let changedIdx = (cards.findIndex((card) => card.id === passedCard.id));
            cards[changedIdx] = card;
            setCards([...cards]);
        }
        return setCard;
    }

    //ComponentWillMount
    useEffect(() => {
        setCards(groups);
    }, [groups]);

    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View style={styles.screenContainer}>
            
            <View style={styles.cardGroupContainer}>
                <ScrollView >
                    {cards.map((card, idx) => {
                        return <GroupCard
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
export default GroupDashboard;