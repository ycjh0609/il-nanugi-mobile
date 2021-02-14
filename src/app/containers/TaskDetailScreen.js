import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import CommonAvartar from '../components/common/CommonAvartar';
import commonStyle from '../styles/commonStyle';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Avatar, Badge } from 'react-native-elements';
import StringUtil from "../utils/string/StringUtil"
import CodeUtil from "../utils/code/CodeUtil";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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
        <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
            <Icon style={{ marginLeft: 5, marginRight: 7 }} size={18} name={iconName} />
            <Text style={{ fontSize: 18, fontWeight: "400" }}>{title}</Text>
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
    useEffect(() => {
        setPassedTsk(route.params.task);
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

                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 9, flexDirection: "row", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: TASK_STATUS_CARD_BACK_COLOR.DOING, padding: 10 }}>
                        <Text>

                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", backgroundColor: TASK_STATUS_CARD_BACK_COLOR.DOING, borderRadius: 10, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, padding: 10 }}>
                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                            <TouchableOpacity>
                                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                                    <Icon size={20} name={"edit"} />
                                </View>
                                {/* <Text style={{ fontSize: 12, marginTop: 3 }}>{"수정"}</Text> */}
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <SubTitle title={"참여중인 멤버"} iconName={"check"} />

                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 9 }}>
                        <ScrollView horizontal style={{ flexDirection: "row", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: TASK_STATUS_CARD_BACK_COLOR.DOING, padding: 10 }}>
                            {passedTask.participants.map((p, idx) => {
                                return (
                                    <View key={"joined-users-" + idx} style={{ flexDirection: "column", alignItems: "center", marginRight: 10 }}>
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
            </View>
        </View>
    )
}
export default TaskDetailScreen;