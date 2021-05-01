import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions, Modal, Pressable, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Avatar, Badge, BottomSheet, SearchBar } from 'react-native-elements';
import StringUtil from "../../utils/string/StringUtil"
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CodeUtil from '../../utils/code/CodeUtil';
import commonStyle from '../../styles/commonStyle';
import TaskParticipantService from '../../services/TaskParticipantService';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.02.15
 * Edit By     : kwak ji hoon 
 * Description : Task Detail TaskParticipants
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row", justifyContent: "center"
    },
    btnContainer: {
        flexDirection: "column", justifyContent: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    modalView: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'column'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TaskParticipants = ({ participantsState, task }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [modalVisible, setMoalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const toggleViewSheet = useCallback(() => {
        setMoalVisible(!modalVisible)
    })
    const addParticipant = useCallback((userId) => {
        TaskParticipantService.addParticipant({ userId, taskId: task.id, roleType: "MEMBER" }).then((res) => {
            participantsState.participants.push(res.data);
            participantsState.setParticipants([...participantsState.participants]);
        });
    })
    const removeParticipant = useCallback((userId) => {
        TaskParticipantService.removeParticipant({ userId, taskId: task.id }).then((res) => {
            let arr = participantsState.participants;
            arr.splice(arr.findIndex(p => p.id === userId), 1)
            participantsState.setParticipants([...arr]);
        });
    })
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={{ ...styles.cardContainer }}>
            <View style={{ flex: 7 }}>
                <ScrollView horizontal style={{ flexDirection: "row", paddingLeft: 5, paddingRight: 5, marginBottom: 10 }}>
                    {participantsState.participants.map((p, idx) => {
                        return (
                            <View key={"participants-" + idx} style={{ flexDirection: "column", alignItems: "center", marginRight: 15 }}>
                                <View>
                                    <Avatar rounded size={50} overlayContainerStyle={{ backgroundColor: "#b0b3b8" }} title={StringUtil.createSummarizeName(p.name)} />
                                    {idx === 0 &&
                                        <Badge containerStyle={{ position: "absolute", top: 0, right: -4 }} status="success" />
                                    }
                                </View>
                                <Text style={{ fontSize: 14, textAlign: "center", marginTop: 3 }}>{p.name}</Text>
                            </View>
                        )
                    })
                    }
                </ScrollView>
            </View>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                <View style={styles.btnContainer}>
                    {task.status !== CodeUtil.TASK_STATUS.END &&
                        <TouchableOpacity onPress={toggleViewSheet}>
                            <Icon size={20} name={"ellipsis-h"} />
                        </TouchableOpacity>
                    }

                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setMoalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={[commonStyle.rowAlignment]}>

                            <SearchBar
                                placeholder="멤버 검색"
                                lightTheme
                                containerStyle={{ padding: 0, borderRadius: 20, width: "85%" }}
                                inputStyle={{ padding: 3, color: "black" }}
                                inputContainerStyle={{ borderRadius: 20, backgroundColor: "#dce1e3", borderWidth: 0 }}
                                showCancel
                                onChangeText={(text) => setSearchText(text)}
                                value={searchText}
                                autoFocus={true}
                            />
                            <View>
                                <Text onPress={() => setMoalVisible(false)} style={{ color: commonStyle.oneTextColor, fontSize: 18, fontWeight: "600" }}>취소</Text>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 10 }}>
                                <Icon style={{ marginLeft: 5, marginRight: 7, color: "#636e7a" }} size={17} name={"users"} />
                                <Text style={{ fontSize: 17, fontWeight: "600", color: "#636e7a" }}>{"참여중인 멤버"}  ({participantsState.participants.length}명)</Text>
                            </View>
                            <View style={{ margin: 5, marginBottom: 10, borderBottomWidth: 1, borderColor: "#cdcdd4" }}></View>

                            <ScrollView horizontal style={{ flexDirection: "row", paddingLeft: 5, paddingRight: 5 }}>
                                {participantsState.participants.map((p, idx) => {
                                    return (
                                        <View key={"participants-" + idx} style={{ flexDirection: "column", alignItems: "center", marginRight: 15 }}>
                                            <View>
                                                <Avatar rounded size={50} overlayContainerStyle={{ backgroundColor: "#b0b3b8" }} title={StringUtil.createSummarizeName(p.name)} />
                                                {idx === 0 &&
                                                    <Badge containerStyle={{ position: "absolute", top: 0, right: -4 }} status="success" />
                                                }
                                            </View>
                                            <Text style={{ fontSize: 14, textAlign: "center", marginTop: 3 }}>{p.name}</Text>
                                        </View>
                                    )
                                })
                                }
                            </ScrollView>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 10 }}>
                            <Icon style={{ marginLeft: 5, marginRight: 7, color: "#636e7a" }} size={17} name={"search"} />
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "#636e7a" }}>
                                {task.group.name} {"멤버"}
                                {" "}({task.group.participants.filter(p => {
                                    return p.name.indexOf(searchText) > -1;
                                }).length}명)

                            </Text>
                        </View>

                        <View style={{ margin: 5, borderBottomWidth: 1, borderColor: "#cdcdd4" }}></View>
                        <ScrollView horizontal={false}>
                            {task.group.participants.filter(p => {
                                return p.name.indexOf(searchText) > -1;
                            }).map(p => {

                                return (
                                    <View key={p.id} style={commonStyle.rowAlignment}>
                                        <View style={{ margin: 8, flexDirection: "row" }}>
                                            <Avatar rounded size={40} overlayContainerStyle={{ backgroundColor: "#b0b3b8" }} title={StringUtil.createSummarizeName(p.name)} />
                                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 30 }}>
                                                {/* roletype 변경해야함 roleType */}
                                                <Text style={{ fontSize: 15 }}>{p.name} </Text>
                                            </View>
                                        </View>

                                        <View style={{ marginRight: 10 }}>
                                            {participantsState.participants.find((taskP) => taskP.id == p.id)
                                                ? <Button onPress={() => removeParticipant(p.id)} color={"red"} title={"추방"}></Button>
                                                : <Button onPress={() => addParticipant(p.id)} color={commonStyle.oneTextColor} title={"추가"}></Button>
                                            }
                                        </View>
                                    </View>

                                )
                            })}
                        </ScrollView>
                    </View>

                </View>
            </Modal>

        </View>
    )
}
export default TaskParticipants;