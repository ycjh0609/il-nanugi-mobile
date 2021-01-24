import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import _ from "lodash";
import ToolBar from "./ToolBar"
import GroupCard from "./GroupCard"
import commonStyle from '../../../common/styles/commonStyle';
import CommonAvartar from '../common/CommonAvartar';
import CommonBtn from '../common/CommonBtn';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : SimpleBoard
 *----------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    cardContainer:{
        padding:10,
        flexDirection:"row"
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

const CNT_BY_ROW = 3;
function createGroupName(name) {
    if (!name) return;
    if (name.split(" ").length == 1) {
        return name.split(" ")[0].substring(0, 2);
    } else if (name.split(" ").length > 1) {
        return name.split(" ")[0].substring(0, 1) + "" + name.split(" ")[1].substring(0, 1);
    }
}
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
            <ToolBar />
            {/* 02. List */}
            <ScrollView>
                <View style={{ marginBottom: 550 }}>
                    {groupsState.groups.map((group,idx)=>(
                        <View key={"group-card-"+idx}>

                        <View style={styles.cardContainer}>
                            <View style={{flex:1,alignItems:"center",justifyContent:"center",marginRight:20}}>
                             <CommonBtn onPress={() => null} style={commonStyle.shodow} 
                                        btnStyle={{ btnSize: 70, type: 0,btnBackgroundColor:group.color }}
                                        titleStyle={{ name: createGroupName(group.name)}} />
                                 {/* <CommonAvartar
                                     overlayContainerStyle={{backgroundColor: 'blue'}}
                                     containerStyle={{width:70,height:70}} size={"medium"} title={createGroupName(group.name)}/> */}
                            </View>
                            <View style={{flex:5,justifyContent:"center",padding:5}}>
                                <Text style={{fontSize:20}}>
                                    {group.name}
                                </Text>
                                <Text style={{fontSize:13,fontWeight:"600",marginTop:5,color:commonStyle.oneTextColor}}>
                                    마지막 수정일: 2021.01.21
                                </Text>
                                <View style={{paddingTop:10,flexDirection:"row"}}>
                                   {group.participants.map((participant,idx)=>(
                                        <View key={"participant-"+idx} style={{marginRight:5}}>
                                            <CommonAvartar title={participant.name}/>
                                        </View>
                                   ))}
                                </View>
                            </View>
                        </View>
                        <View style={{borderBottomColor:group.color,borderBottomWidth:1,marginBottom:5}}></View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}
export default GroupList;