import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import CodeUtil from "../utils/code/CodeUtil";
import _ from 'lodash';
import CommonLoadingActivity from '../components/common/CommonLoadingActivity';
import { Button } from 'react-native';
import SearchGroupModal from '../components/create-task/SearchGroupModal';


const SubTitle = ({ title, iconName }) => {
    return (
        <View style={{ flexDirection: "row", marginBottom: 15, }}>
            <Icon style={{ marginLeft: 5, marginRight: 7, color: "#636e7a" }} size={17} name={iconName} />
            <Text style={{ fontSize: 17, fontWeight: "600", color: "#636e7a" }}>{title}</Text>
        </View>
    )
}
const CreateTaskScreen = ({ route, navigation }) => {
    const [createdTask,setCreatedTask] = useState(route.params.task); // new createdTask!!
    const [searchGroupModalVisible,setSearchGroupModalVisible] = useState(false);
    const [loadingVisible,setLoadingVisible] = useState(false);
    useEffect(()=>{
        console.log(createdTask)
    })

    const changeTaskStatus = useCallback(() => {
        let status = createdTask.status;
        if (status === CodeUtil.TASK_STATUS.TODO) {
            status = CodeUtil.TASK_STATUS.DOING
        } else if (status === CodeUtil.TASK_STATUS.DOING) {
            status = CodeUtil.TASK_STATUS.TODO;
        } 
        route.params.task.status = status;
        setCreatedTask({...createdTask,status})
    })

  
    return  (
        <View style={{ margin: 20, }}>
                <View style={{ flexDirection: "column" }}>
                    {/*------------------------------ 
                        1) Row 1 => 그룹, 태스크 상태
                    ------------------------------*/}
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{flex:3,marginRight:5}}>
                            <SubTitle title={"그룹"} iconName={"users"} />
                            <View onTouchStart={()=>setSearchGroupModalVisible(!searchGroupModalVisible)} 
                                style={{flexDirection:"row",backgroundColor: CodeUtil.getTaskColorByStatus(CodeUtil.TASK_STATUS.TODO), height: 40, borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection:"row", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 16 }} >기본 그룹</Text>
                                    <Icon style={{ color: "white", marginLeft: 10}} size={16} name={"search"} />
                                </View>
                            </View>
                            <View style={{marginTop:15,marginBottom:15,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                            
                        </View>
                        <View style={{flex:2,marginLeft:5}}>
                            <SubTitle title={"상태"} iconName={"check"} />
                            <View onTouchStart={() => changeTaskStatus()}
                                style={{flexDirection:"row",backgroundColor: CodeUtil.getTaskColorByStatus(createdTask.status), height: 40, borderRadius: 10 }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 16 }} >{CodeUtil.getTaskTextByStatus(createdTask.status)}</Text>
                                </View>
                            </View>
                            <View style={{marginTop:15,marginBottom:15,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                        </View>
                    </View> 
                </View>
            {searchGroupModalVisible && <SearchGroupModal searchGroupModalVisible={searchGroupModalVisible} setSearchGroupModalVisible={setSearchGroupModalVisible}/>}
            <CommonLoadingActivity isVisible={loadingVisible}/>
        </View>
    )
}

export default CreateTaskScreen;