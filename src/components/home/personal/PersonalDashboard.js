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
        marginLeft:10
        , marginRight:10
        , marginBottom: 600
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const PersonalDashboard = ({ navigation, tasks }) => {
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
                return card.status === "A"
            } else if (taskStatus === 2) {
                return card.status === "E"
            }
        }).sort((a, b) => {
            if (sortType === 0) {
                return a.deadlineTime < b.deadlineTime ? 1 : a.deadlineTime > b.deadlineTime ? -1 : 0;
            } else if (sortType === 1) {
                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            } else {
                return a.groupId < b.groupId ? -1 : a.groupId > b.groupId ? 1 : 0;
            }
        });
        return visible;
    })

    useEffect(() => {
        setCards(tasks);
    }, [tasks]);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.screenContainer}>
            <TopNavigation collocate={{ sortType, setSortType, taskStatus, setTaskStatus }} />
            <View style={styles.cardGroupContainer}>
                {cards.length > 0 &&
                    <ScrollView  style={{height:"100%"}}>
                        {reCollocateCards(cards).map((card, idx) => {
                            return <TaskCard
                                idx={idx}
                                key={card.id}
                                card={card}
                                onPress={null}
                                navigation={navigation}
                                setCard={getSetterEachCard(card)} />
                        })}
                    </ScrollView>
                }
            </View>
        </View>
    )
}
export default PersonalDashboard;