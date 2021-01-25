import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button, Group } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import _ from "lodash";

import { Icon } from 'react-native-elements';

import ToolBar from "./ToolBar"
import GroupCard from "./GroupCard"
import commonStyle from '../../../common/styles/commonStyle';
import CommonAvartar from '../common/CommonAvartar';
import CommonBtn from '../common/CommonBtn';
import { SearchBar } from 'react-native-elements';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : SimpleBoard
 *----------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        margin: 20
    },

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const GroupList = ({ navigation, groupsState }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [searchText, setSearchText] = useState("");
    const [reCollocatedCards, setReCollocatedCards] = useState([]);
    const updateSearchText = useCallback((text) => {
        setSearchText(text);
    });
    useEffect(()=>{
        setReCollocatedCards(groupsState.groups)
    },[groupsState.groups])
    useEffect(function handleSearchText() {
        if (!searchText|| searchText ==null || searchText.trim().length == 0){
            setReCollocatedCards(groupsState.groups);
        }else{
            let temp = groupsState.groups
            .filter((group) => {
                return group.name.indexOf(searchText) > -1 ? true : false;
            })
            setReCollocatedCards(temp);
        }
    }, [searchText])

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>
            {/* 01. title and toolbar */}
            <ToolBar groupsState={groupsState} />
            {/* 02. List */}

            <SearchBar
                placeholder="그룹 검색"
                lightTheme
                containerStyle={{ padding: 0, borderRadius: 15 }}
                inputStyle={{ padding: 3, color: "black" }}
                inputContainerStyle={{ borderRadius: 15, backgroundColor: "#dce1e3", borderWidth: 0 }}
                showCancel
                onFocus={() => console.log(1)}
                onChangeText={updateSearchText}
                value={searchText}
            />
            {searchText.length > 0 &&
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                    <Icon style={{marginTop:5}} color={commonStyle.oneTextColor} name={"check"} size={16}></Icon>
                    <Text style={{ color:commonStyle.oneTextColor ,textAlign: "center", marginTop: 5, fontSize: 15, marginLeft: 2 }}>
                        {reCollocatedCards.length}개의 그룹이 조회되었습니다.
                    </Text>
                </View>
            }
            <ScrollView>
                <View style={{ marginBottom: 550 }}>
                    {reCollocatedCards.map((group, idx) => (
                        <GroupCard group={group} key={"group-" + idx} />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}
export default GroupList;