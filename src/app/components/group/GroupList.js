import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button, Group } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import _ from "lodash";
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

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>
            {/* 01. title and toolbar */}
            <ToolBar groupsState={groupsState} />
            {/* 02. List */}

            <SearchBar 
                placeholder="From" 
                lightTheme
                round
                showCancel
                // onChangeText={null}
                value={""}
                containerStyle={{backgroundColor:null,borderEndWidth:0}}
            />
            <ScrollView>
                <View style={{ marginBottom: 550 }}>
                    {groupsState.groups.map((group, idx) => (
                        
                        <GroupCard group={group} key={"group-"+idx}/>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}
export default GroupList;