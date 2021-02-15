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
import Participants from '../components/task-detail/Participants';
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
    const [description, setDescription] = useState("");
    const [participants, setParticipants] = useState([]);
    useEffect(() => {
        setPassedTsk(route.params.task);
        if (isNil(route.params.task.startTime)) {
            setStartTime(null);
        } else {
            setStartTime(route.params.task.startTime);
        }
        setParticipants(route.params.task.participants)
        setEndTime(route.params.task.endTime);
    }, [route.params.task]);
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    if (Object.keys(passedTask).length == 0) return <View></View>
    return (
        <View style={{ margin: 20 }}>
            <ScrollView style={{ height: Dimensions.get("window").height }}>
                <View style={{ flexDirection: "column" }}>

                    <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
                        <Icon style={{ marginLeft: 5, marginRight: 7 }} size={18} name={"users"} color={passedTask.group.color} />
                        <Text style={{ fontSize: 18, fontWeight: "400" }}>{passedTask.group.name}</Text>
                    </View>
                    <Description descriptionState={{ description, setDescription }} />

                    <SubTitle title={"참여중인 멤버"} iconName={"check"} />
                    <Participants participantsState={{ participants, setDescription }} />

                    <SubTitle title={"시작시간"} iconName={"clock"} />
                    <TimePicker timeState={{ time: startTime, setTime: setStartTime }} />

                    <SubTitle title={"마감시간"} iconName={"clock"} />
                    <TimePicker timeState={{ time: endTime, setTime: setEndTime }} />

                    <SubTitle title={"이슈"} iconName={"list-ol"} />
                    
                </View>
            </ScrollView>
        </View>
    )
}
export default TaskDetailScreen;