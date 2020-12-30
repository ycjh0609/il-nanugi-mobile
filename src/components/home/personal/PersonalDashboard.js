import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import commonStyle from "../../../common/styles/commonStyle";
import { useStoreState, defineStoreItem } from '../../../common/utils/store/commonStore';
import TopNavigation from './TopNavigation';
import TaskCard from './card/TaskCard';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon 
 * Description : task dashboard by user
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
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
        margin:10
        , marginTop:0
        , marginBottom: 560
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
function getPersonalCards() {
    console.log("get")
    let temp = [
        { id: "1", groupId:"1", taskStatus: "A", title: "모바일 개발", deadlineTime: "202012200000", cardStyle: { backgroundColor: "#53b5b5" } },
        { id: "3", groupId:"1", taskStatus: "A", title: "백엔드 개발", deadlineTime: "202112112341", cardStyle: { backgroundColor: "#53b5b5" } },
        { id: "2", groupId:"2", taskStatus: "E", title: "꽃님이 산책", deadlineTime: "201911212341", cardStyle: { backgroundColor: "#FFE5B4" } },
        { id: "6", groupId:"3", taskStatus: "E", title: "경영과학 과제", deadlineTime: "201812311341", cardStyle: { backgroundColor: "#FFE5B4" } },
        { id: "8", groupId:"1", taskStatus: "E", title: "화면개발", deadlineTime: "201312312331", cardStyle: { backgroundColor: "#53b5b5" } },
        { id: "9", groupId:"4", taskStatus: "A", title: "테스트 하기", deadlineTime: "202312312331", cardStyle: { backgroundColor: "#FF8C00" } },

    ]
    return temp;
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const PersonalDashboard = ({ navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const [sortType, setSortType] = useState(0);
    const [taskStatus, setTaskStatus] = useState(0);
    const [cards, setCards] = useState([]);

    /***************************
     * 렌더링 될 각 카드에 전달할 각 카드 setter 생성 
    ***************************/
    const getSetterEachCard = useCallback(passedCard => {
        // 각 카드가 변경되어 setCard가 호출되면 카드 전체를 setter로 변경
        const setCard = (card) => {
            let changedIdx = (cards.findIndex((card) => card.id === passedCard.id));
            cards[changedIdx] = card;
            setCards([...cards]);
        }
        return setCard;
    })

    /***************************
     * 카드 재배치
    ***************************/
    const reCollocateCards = useCallback((cards) => {
        let visible = cards.filter((card) => {
            if (taskStatus === 0) {
                return true;
            } else if (taskStatus === 1) {
                return card.taskStatus === "A"
            } else if (taskStatus === 2) {
                return card.taskStatus === "E"
            }
        }).sort((a, b) => {
            if (sortType === 0) {
                return a.deadlineTime < b.deadlineTime ? 1 : a.deadlineTime > b.deadlineTime ? -1 : 0;
            } else if (sortType === 1){
                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            }else {
                return a.groupId < b.groupId ? -1 : a.groupId > b.groupId ? 1 : 0;
            }
        });
        return visible;
    })

    useEffect(() => {
        let cards = getPersonalCards();
        setCards(cards);
    }, []);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
   return (
        <View style={styles.screenContainer}>
            <TopNavigation collocate={{ sortType, setSortType, taskStatus, setTaskStatus }} />
            <View style={styles.cardGroupContainer}>
                <ScrollView >
                    {reCollocateCards(cards).map((card, idx) => {
                        return <TaskCard
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
}
export default PersonalDashboard;