import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import CodeUtil from "../utils/code/CodeUtil";
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import TimePicker from '../components/task-detail/TimePicker';
import _ from 'lodash';
import moment from "moment";
import Description from '../components/task-detail/Description';
import Participants from '../components/task-detail/Participants';
import TaskService from '../services/TaskService';
import { WebView } from 'react-native-webview';
import { Badge, BottomSheet,ButtonGroup,Input,Overlay } from 'react-native-elements';
import { Button } from 'react-native-elements';
import CommonLoadingActivity from '../components/common/CommonLoadingActivity';


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
        <View style={{ flexDirection: "row", marginBottom: 15, }}>
            <Icon style={{ marginLeft: 5, marginRight: 7, color: "#636e7a" }} size={17} name={iconName} />
            <Text style={{ fontSize: 17, fontWeight: "600", color: "#636e7a" }}>{title}</Text>
        </View>
    )
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TaskDetailScreen = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks Variables
    *-------------------------------------------------------------------------------*/
    const [task, setTask] = useState({});
    const [loadingVisible,setLoadingVisible] = useState(false);
    //각각을 업데이트 할 수 있도록 나누자
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");
    const [participants, setParticipants] = useState([]);

    const [editType,setEditType] = useState(0);

    /*-------------------------------------------------------------------------------
    * 03-2) fetch Methods
    *-------------------------------------------------------------------------------*/
    const initializeTask = async (taskId) => {
        try {
            setLoadingVisible(true);
            let fetchedTask = (await getTaskOne(taskId)).data;
            
            setTask(fetchedTask);
            //startTime 은 null 가능하기에 ...z
            if (_.isNil(fetchedTask.startTime)) {
                setStartTime(null);
            } else {
                setStartTime(fetchedTask.startTime);
            }
            setParticipants(fetchedTask.participants);
            setEndTime(fetchedTask.endTime);
        } catch (e) {
            console.log(e);
        }finally{
            setTimeout(()=>{
                setLoadingVisible(false);
            },100)
        }
    }

    const getTaskOne = useCallback((taskId)=>{
        return TaskService.getTaskOne(taskId);
    })

    const updateTaskProp = useCallback((propName, data,callback) => {
        let updated = {...task};
        updated[propName] = data;
        TaskService.updateTask(updated,updated.id).then((res)=>{
            navigation.navigate("TaskDetailScreen", { task: res.data });
            callback(res.data);
        });
    })

    const changeTaskStatus = useCallback(() => {
        let status = task.status;
        if (status === CodeUtil.TASK_STATUS.TODO) {
            status = CodeUtil.TASK_STATUS.DOING
        } else if (status === CodeUtil.TASK_STATUS.DOING) {
            status = CodeUtil.TASK_STATUS.END;
        } else if (status === CodeUtil.TASK_STATUS.END) {
            status = CodeUtil.TASK_STATUS.TODO;
        }
        updateTaskProp("status",status,(task)=>{
            setTask(task)
        });
    })


    /*-------------------------------------------------------------------------------
    * 03-3) Hooks Effects
    *-------------------------------------------------------------------------------*/
    
    useEffect(() => {
        let taskId = route.params.task.id;
        initializeTask(taskId);
    },[route.params.task.id]);
    useEffect(()=>{
        if (startTime!="" && startTime != task.startTime){
            updateTaskProp("startTime",startTime,(task)=>{
                setTask(task)
            });
       }
    },[startTime])
    useEffect(()=>{
        if (endTime !=""  && endTime != task.endTime){
            updateTaskProp("endTime",endTime,(task)=>{
                setTask(task)
            });
       }
    },[endTime])
    /*-------------------------------------------------------------------------------
    * 03-4) View
    *-------------------------------------------------------------------------------*/
    if (Object.keys(task).length == 0) return <View></View>
    return (
        <View style={{ margin: 20, }}>
            <ScrollView style={{ height: Dimensions.get("window").height }}>
                <View style={{ flexDirection: "column" }}>
                    
                    {/*------------------------------ 
                        1) Row 1 => 그룹, 태스크 상태
                    ------------------------------*/}
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{flex:3,marginRight:5}}>
                            <SubTitle title={"그룹"} iconName={"users"} />
                            <View onTouchStart={() => navigation.navigate("GroupDetailScreen",{group:task.group})}
                                style={{flexDirection:"row",backgroundColor: task.group.color, height: 40, borderRadius: 10 }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 16 }} >{task.group.name}</Text>
                                </View>
                            </View>
                            <View style={{marginTop:15,marginBottom:15,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                            
                        </View>
                        <View style={{flex:2,marginLeft:5}}>
                            <SubTitle title={"상태"} iconName={"check"} />
                            <View onTouchStart={() => changeTaskStatus()}
                                style={{flexDirection:"row",backgroundColor: CodeUtil.getTaskColorByStatus(task.status), height: 40, borderRadius: 10 }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 16 }} >{CodeUtil.getTaskTextByStatus(task.status)}</Text>
                                </View>
                            </View>
                            <View style={{marginTop:15,marginBottom:15,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                        </View>
                    </View>

                    <View style={{marginTop:10}}></View>
                    
                    {/*------------------------------ 
                        2) Row 3 => 메모
                    ------------------------------*/}
                    <SubTitle title={"설명"} iconName={"paper-plane"} />
                    <TouchableOpacity onPress={()=>setEditType(1)} style={{padding:5}}>
                        <Text >
                        애국가(愛國歌)는 대한민국의 국가이다. 1919년 안창호에 의해 대한민국 
                        임시 정부에서 스코틀랜드 민요인 〈작별〉에 삽입해서 부르기 시작하다가 1935년 한국의 ...
                        </Text>
                    </TouchableOpacity>
                    
                    <View style={{marginTop:15,marginBottom:20,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                    
                    {/*------------------------------ 
                        3) Row 3 => 참여중인 멤버
                    ------------------------------*/}
                    <SubTitle title={"참여중인 멤버"} iconName={"users-cog"} />
                    <Participants onPressAddParticipant={()=>setEditType(2)} participantsState={{ participants, setDescription }} />
                
                    <View style={{marginTop:15,marginBottom:15,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                    
                    {/*------------------------------ 
                        4) Row 4 => 시작일, 마감일
                    ------------------------------*/}             
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    
                        <View style={{flex:1,marginRight:15}} onTouchStart={()=>setEditType(3)}>
                            <View style={{flexDirection:"row"}}>
                                <SubTitle title={"시작일"} iconName={"clock"} />
                                <Badge containerStyle={{marginLeft:5}}/>
                            </View>
                            <Text style={{fontSize:17,textAlign:"center"}}>{moment(startTime, 'YYYYMMDDhhmm').format('YY년 MM월 DD일 hh:mm')}</Text>
                            <View style={{marginTop:15,marginBottom:15,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                            
                        </View>
                        <View style={{flex:1,marginLeft:15}} onTouchStart={()=>setEditType(4)}>
                            <View style={{flexDirection:"row"}}>
                                <SubTitle title={"마감일"} iconName={"clock"} />
                                <Badge containerStyle={{marginLeft:5}}/>
                            </View>
                            <Text style={{fontSize:17,textAlign:"center"}}>{moment(endTime, 'YYYYMMDDhhmm').format('YY년 MM월 DD일 hh:mm')}</Text>
                            <View style={{marginTop:15,marginBottom:15,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                        </View>

                    </View>

                    <View style={{marginBottom:15}}></View>
                    <SubTitle title={"TAG"} iconName={"tags"} />
                    <View style={{flexDirection:"row"}}>
                        <Text style={{margin:3}}>#개발</Text>
                        <Text style={{margin:3}}>#집안일</Text>
                        <Text style={{margin:3}}>#개발</Text>
                    </View>
                    
                    <View style={{marginTop:15,marginBottom:15,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                  

                    <SubTitle title={"히스토리"} iconName={"list-ol"} />

                    {["E", "D", "D", "T", "E"].map((v,i) => {
                        return (
                            <View key={i} style={{ height: 40,flexDirection: "row", borderRadius: 10, marginBottom: 15 }}>
                                <View style={{ flex: 1.5, borderWidth: .3, justifyContent: "center", alignItems: "center", backgroundColor: CodeUtil.getTaskColorByStatus(v), borderColor: CodeUtil.getTaskColorByStatus(v), borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                    <Text style={{color:"white"}}>상태 변경</Text>
                                </View>
                                <View style={{ flex: 4, borderWidth: .3, borderLeftColor: "white",borderColor: CodeUtil.getTaskColorByStatus(v) }}>

                                </View>
                                <View style={{ flex: 1, borderWidth: .3, justifyContent: "center", alignItems: "center",backgroundColor:CodeUtil.getTaskColorByStatus(v), borderTopRightRadius: 10, borderBottomRightRadius: 10,borderColor: CodeUtil.getTaskColorByStatus(v) }}>
                                    <Text style={{color:"white"}}>{"12.03"}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>

            <BottomSheet onBackdropPress={()=>setEditType(0)} isVisible={editType == 2 ? true:false} containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
                <View onTouchStart={()=>setEditType(2)}>
                    
                </View>
            </BottomSheet>

            <BottomSheet isVisible={editType == 3 ? true:false} title="asdf" containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',height:200 }}>
                <View style={{}} onTouchStart={()=>setEditType(3)}>
                    <TimePicker onCancle={()=>setEditType(0)} timeState={{time:startTime,setTime: setStartTime}} />
                </View>
            </BottomSheet>


            <BottomSheet isVisible={editType == 4 ? true:false} title="asdf" containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' ,height:200}}>
                <View style={{}} onTouchStart={()=>setEditType(4)}>
                    <TimePicker onCancle={()=>setEditType(0)} timeState={{time:endTime,setTime: setEndTime}} />
                </View>
            </BottomSheet>

            <Overlay overlayStyle={{borderRadius:20,marginBottom:200}} isVisible={editType == 1 ? true:false} onBackdropPress={()=>setEditType(0)}>
                <View style={{width:Dimensions.get("window").width*0.8,height:350,flexDirection:"column",padding:20}}>
                    
                    <SubTitle title={"설명"} iconName={"paper-plane"} />
                    <View style={{marginTop:5,marginBottom:5,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                  
                    <ScrollView style={{padding:5}}>
                        <TextInput autoFocus={true} multiline = {true} style={{height:200}} value={`애국가(愛國歌)는 대한민국의 국가이다. 1919년 안창호에 의해 대한민국 
                        임시 정부에서 스코틀랜드 민요인 〈작별〉에 삽입해서 부르기 시작하다가 1935년 한국의 ...`}>
                        
                        </TextInput>
                    </ScrollView>
                    <View style={{flexDirection:"row",justifyContent:"space-around",bottom:0}}>
                        <Button style={{width:130}} title="수정" />
                        <Button style={{width:130}} title="취소" onPress={()=>setEditType(0)} />
                        {/* <Button style={{width:80}} title="Solid Button" /> */}
                    </View>
                </View>
            </Overlay>


            <CommonLoadingActivity isVisible={loadingVisible}/>
        </View>
    )
}
export default TaskDetailScreen;