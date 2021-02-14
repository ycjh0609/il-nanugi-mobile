import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions } from "react-native";
import CommonAvartar from '../components/common/CommonAvartar';
import commonStyle from '../styles/commonStyle';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Avatar, Badge } from 'react-native-elements';
import StringUtil from "../utils/string/StringUtil"
import DatePicker from 'react-native-date-picker'
import CodeUtil from "../utils/code/CodeUtil";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TimePicker from '../components/task-detail/TimePicker';
import { isNil } from 'lodash';
import Description from '../components/task-detail/Description';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.26 
 * Edit By     : kwak ji hoon 
 * Description : GroupDetail Container Screen
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    subTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    subTitleContainer: {
        flexDirection: "row",
        marginBottom: 10
    }
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

const TASK_STATUS_CARD_BACK_COLOR = {
    TODO: "", DOING: "#dde8ed", END: ""
}
const SubTitle = ({ title, iconName }) => {
    return (
        <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 15 }}>
            <Icon style={{ marginLeft: 5, marginRight: 7 }} size={15} name={iconName} />
            <Text style={{ fontSize: 15, fontWeight: "400" }}>{title}</Text>
        </View>
    )
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TaskDetailScreen = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [passedTask, setPassedTsk] = useState({});
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    useEffect(() => {
        setPassedTsk(route.params.task);
        if (isNil(route.params.task.startTime)) {
            setStartTime(null);
        }else{
            setStartTime(route.params.task.startTime);
        }
       
        setEndTime(route.params.task.endTime);
    }, [route.params.task]);
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    if (Object.keys(passedTask).length == 0) return <View></View>
    return (
        <View style={{ margin: 20 }}>
            <View style={{ flexDirection: "column" }}>

                <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
                    <Icon style={{ marginLeft: 5, marginRight: 7 }} size={18} name={"users"} color={passedTask.group.color} />
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>{passedTask.group.name}</Text>

                </View>

                <Description/>

                <SubTitle title={"참여중인 멤버"} iconName={"check"} />

                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 9 }}>
                        <ScrollView horizontal style={{ flexDirection: "row", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: TASK_STATUS_CARD_BACK_COLOR.DOING, padding: 10 }}>
                            {passedTask.participants.map((p, idx) => {
                                return (
                                    <View key={"joined-users-" + idx} style={{ flexDirection: "column", alignItems: "center", marginRight: 15 }}>
                                        <View>
                                            <Avatar rounded size={45} overlayContainerStyle={{ backgroundColor: "#b0b3b8" }} title={StringUtil.createSummarizeName(p.name)} />
                                            {idx === 0 &&
                                                <Badge containerStyle={{ position: "absolute", top: 0, right: -4 }} status="success" />
                                            }
                                        </View>
                                        <Text style={{ fontSize: 12, textAlign: "center", marginTop: 3 }}>{p.name}</Text>
                                    </View>
                                )
                            })
                            }
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", backgroundColor: TASK_STATUS_CARD_BACK_COLOR.DOING, borderRadius: 10, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, padding: 10 }}>
                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                            <TouchableOpacity>
                                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                                    <Icon size={20} name={"ellipsis-h"} />
                                </View>
                                <Text style={{ fontSize: 12, marginTop: 3 }}>{"더보기"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
                            
                <SubTitle title={"시작시간"} iconName={"clock"} />
                <TimePicker timeState={{ time: startTime, setTime: setStartTime }} />

                <SubTitle title={"마감시간"} iconName={"clock"} />
                <TimePicker timeState={{ time: endTime, setTime: setEndTime }} />

                
            </View>
        </View>
    )
}
export default TaskDetailScreen;