import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import commonStyle from '../../../common/styles/commonStyle';
import ToolBar from './ToolBar';
import { CheckBox } from 'react-native-elements';
import { padEnd } from 'lodash';
import CommonAvartar from '../../common/CommonAvartar';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : SimpleBoard
 *----------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    textType01: {
        fontSize: 30,
        fontWeight: "800"
    },
    textType02: {
        fontSize: 18,
        fontWeight: "600"
    }
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
function createContentName(name) {
    if (name.split(" ").length == 1) {
        return name.split(" ")[0].substring(0, 2);
    } else if (name.split(" ").length > 1) {
        return name.split(" ")[0].substring(0, 1) + "" + name.split(" ")[1].substring(0, 1);
    }
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const SimpleBoard = ({ navigation, route, tasks, groups, currentPage, setCurrentPage }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>

            {/* 01. title */}
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.textType01}>할일</Text>
                <Text style={styles.textType02}> Check List</Text>
            </View>
            <View style={{ borderBottomWidth: 1, width: 170, marginTop: 10 }}></View>
            {/* 02. toolbar */}
            <ToolBar />
            {/* 03. content */}
            <ScrollView style={{marginBottom:200}}>

                {tasks && 
                    tasks.filter((task_)=> true)
                          .map((task, idx) => {
                    return (
                        <View key={"task-checkbox-" + idx} >
                            
                        <View style={commonStyle.rowAlignment}>
                            <CheckBox
                                containerStyle={{
                                    padding: 15,
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                    borderColor: task.group.color,
                                    borderWidth: 1,
                                    flex: 5,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    height: 55,

                                }}
                                textStyle={{
                                    fontSize: 15,
                                    textDecorationLine: task.status=="E"? 'line-through':null
                                }}
                                checked={task.status=="E"?true:false}
                                title={task.title}
                            />
                            <View style={{
                                flex: 1,
                                backgroundColor: task.group.color,
                                borderTopRightRadius: 15,
                                borderBottomRightRadius: 15,
                                width: "100%", height: 55
                            }}>
                                <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>

                                    {/* 1안 */}
                                    {/* <View style={
                                        {borderRadius:37*2,height:37,width:37,backgroundColor:"white"
                                        ,...commonStyle.columnCenterAlignment,justifyContent:"center"}}>

                                    <CommonAvartar title={task.group.name.substring(0,2)}></CommonAvartar>
                                    </View> */}

                                    {/* 2안 */}
                                    {/* <View style={
                                        {borderRadius:37*2,height:37,width:37,backgroundColor:"white"
                                        ,...commonStyle.columnCenterAlignment,justifyContent:"center"}}>
                                    <CommonAvartar 
                                        
                                        titleStyle={{fontSize:14,color:"#30383b",fontWeight:"700"}} title={createContentName( task.group.name)}/>
                                        </View> */}

                                    <View style={{...commonStyle.columnCenterAlignment,justifyContent:"center"}}>
                                        <Text style={{color:"white",fontWeight:"600",fontSize:17}}>{createContentName( task.group.name)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                            
                        </View>
                    )
                })}
            </ScrollView>


        </View>
    )
}
export default SimpleBoard;