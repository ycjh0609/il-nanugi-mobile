import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import CommonAvartar from '../components/common/CommonAvartar';
import commonStyle from '../styles/commonStyle';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Badge } from 'react-native-elements';
import StringUtil from "../utils/string/StringUtil"
import { ScrollView } from 'react-native-gesture-handler';
import CommonBtn from '../components/common/CommonBtn';
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
        flexDirection: "row"
    }
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

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
    return (
        <View style={{ margin: 20 }}>
            <View>
                <View style={styles.subTitleContainer}>
                    {/* <Icon name={"users"} size={25} style={{marginRight:8}} /> */}
                    <Text style={styles.subTitle}>MEMBERS</Text>
                    <Badge />
                </View>

                <View style={{ marginTop: 5, flexDirection: "row" }}>
                    <View style={{ flexDirection: "row",flex:1 }}>
                        <View style={{ padding:5,...commonStyle.columnCenterAlignment }}>
                            <CommonBtn onPress={() => Alert.alert("멤버 추가")} style={commonStyle.shodow} btnStyle={{ btnSize: 50, type: 1 }}
                                titleStyle={{ name: "+", subName: "멤버" }} />
                            {/* <Text style={{ fontSize: 11, marginTop: 3 }}>{participant.name}</Text> */}
                        </View>
                    </View>
                    <View style={{flex:5}} >
                        <ScrollView  horizontal>
                            <View style={{ flexDirection: "row", padding: 5 }}>
                                {passedTask.participants &&
                                    passedTask.participants.map((participant, idx) => {
                                        return (
                                            <View key={"participant-" + idx} style={{ margin: 5, ...commonStyle.columnCenterAlignment }}>
                                                <CommonAvartar title={StringUtil.createSummarizeName(participant.name)} />
                                                <Text style={{ fontSize: 11, marginTop: 3 }}>{participant.name}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{flex:0.5,justifyContent:"center"}}>
                        <Text>></Text>
                    </View>

                </View>
            </View>
        </View>
    )
}
export default TaskDetailScreen;