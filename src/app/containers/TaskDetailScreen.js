import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import CodeUtil from "../utils/code/CodeUtil";
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import TimePicker from '../components/task-detail/TimePicker';
import _ from 'lodash';
import moment from "moment";
import TaskParticipants from '../components/task-detail/TaskParticipants';
import TaskService from '../services/TaskService';
import {Badge, BottomSheet, Button, Overlay} from 'react-native-elements';
import CommonLoadingActivity from '../components/common/CommonLoadingActivity';
import {CommonActions} from '@react-navigation/native';

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
const SubTitle = ({title, iconName}) => {
  return (
    <View style={{flexDirection: "row", marginBottom: 15,}}>
      <Icon style={{marginLeft: 5, marginRight: 7, color: "#636e7a"}} size={17} name={iconName}/>
      <Text style={{fontSize: 17, fontWeight: "600", color: "#636e7a"}}>{title}</Text>
    </View>
  )
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TaskDetailScreen = ({route, navigation}) => {
  /*-------------------------------------------------------------------------------
  * 03-1) Hooks Variables
  *-------------------------------------------------------------------------------*/
  const [task, setTask] = useState({});
  const [loadingVisible, setLoadingVisible] = useState(false);
  //????????? ???????????? ??? ??? ????????? ?????????
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);
  const [editType, setEditType] = useState(0);

  /*-------------------------------------------------------------------------------
  * 03-2) fetch Methods
  *-------------------------------------------------------------------------------*/
  const initializeTask = async (taskId) => {
    try {
      setLoadingVisible(true);
      let fetchedTask = (await getTaskOne(taskId)).data;

      setTask(fetchedTask);
      //startTime ??? null ??????????????? ...z
      if (_.isNil(fetchedTask.startTime)) {
        setStartTime(null);
      } else {
        setStartTime(fetchedTask.startTime);
      }
      setParticipants(fetchedTask.participants);
      setEndTime(fetchedTask.endTime);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoadingVisible(false);
      }, 100)
    }
  }

  const getTaskOne = useCallback((taskId) => {
    return TaskService.getTaskOne(taskId);
  })

  const updateTaskProp = useCallback((propName, data, callback) => {
    let updated = {};
    updated[propName] = data;
    TaskService.updateTask(updated, task.id).then((res) => {
      navigation.navigate("TaskDetailScreen", {task: res.data});
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
    updateTaskProp("status", status, (task) => {
      setTask(task)
    });
  })


  /*-------------------------------------------------------------------------------
  * 03-3) Hooks Effects
  *-------------------------------------------------------------------------------*/

  useEffect(() => {
    let taskId = route.params.task.id;
    initializeTask(taskId);
  }, [route.params.task.id]);
  useEffect(() => {
    if (startTime != "" && startTime != task.startTime) {
      updateTaskProp("startTime", startTime, (task) => {
        setTask(task)
      });
    }
  }, [startTime])
  useEffect(() => {
    if (endTime != "" && endTime != task.endTime) {
      updateTaskProp("endTime", endTime, (task) => {
        setTask(task)
      });
    }
  }, [endTime])
  let onTouchStart = () => {
    navigation.dispatch(CommonActions.navigate(
      'Group',
      {screen: 'GroupDetailScreen', group: task.group},
    ));
    // navigation.navigate("Group", {screen: "GroupDetailScreen", group: task.group});
  };
  /*-------------------------------------------------------------------------------
  * 03-4) View
  *-------------------------------------------------------------------------------*/
  if (Object.keys(task).length == 0) return <View></View>

  return (
    <View style={{margin: 20,}}>
      <ScrollView style={{height: Dimensions.get("window").height}}>
        <View style={{flexDirection: "column"}}>

          {/*------------------------------
                        1) Row 1 => ??????, ????????? ??????
                    ------------------------------*/}
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{flex: 3, marginRight: 5}}>
              <SubTitle title={"??????"} iconName={"users"}/>
              <View onTouchStart={onTouchStart}
                    style={{flexDirection: "row", backgroundColor: task.group.color, height: 40, borderRadius: 10}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <Text style={{color: "white", fontSize: 16}}>{task.group.name}</Text>
                </View>
              </View>
              <View style={{marginTop: 15, marginBottom: 15, borderBottomWidth: 2, borderColor: "#cdcdd4"}}></View>

            </View>
            <View style={{flex: 2, marginLeft: 5}}>
              <SubTitle title={"??????"} iconName={"check"}/>
              <View onTouchStart={() => changeTaskStatus()}
                    style={{
                      flexDirection: "row",
                      backgroundColor: CodeUtil.getTaskColorByStatus(task.status),
                      height: 40,
                      borderRadius: 10
                    }}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <Text style={{color: "white", fontSize: 16}}>{CodeUtil.getTaskTextByStatus(task.status)}</Text>
                </View>
              </View>
              <View style={{marginTop: 15, marginBottom: 15, borderBottomWidth: 2, borderColor: "#cdcdd4"}}></View>
            </View>
          </View>


          {/*------------------------------
                        2) Row 3 => ??????
                    ------------------------------*/}

          {/*
                     <View style={{marginTop:10}}></View>
                    <SubTitle title={"??????"} iconName={"paper-plane"} />
                    <TouchableOpacity onPress={()=>setEditType(1)} style={{padding:5}}>
                        <Text >
                        ?????????(?????????)??? ??????????????? ????????????. 1919??? ???????????? ?????? ????????????
                        ?????? ???????????? ??????????????? ????????? ??????????????? ???????????? ????????? ??????????????? 1935??? ????????? ...
                        </Text>
                    </TouchableOpacity>
                     <View style={{marginTop:15,marginBottom:20,borderBottomWidth:2,borderColor:"#cdcdd4"}}></View>
                    */}


          {/*------------------------------
                        3) Row 3 => ???????????? ??????
                    ------------------------------*/}
          <SubTitle title={"???????????? ??????"} iconName={"users-cog"}/>
          <TaskParticipants task={task} participantsState={{participants, setParticipants}}/>

          <View style={{marginTop: 15, marginBottom: 15, borderBottomWidth: 2, borderColor: "#cdcdd4"}}></View>

          {/*------------------------------
                        4) Row 4 => ?????????, ?????????
                    ------------------------------*/}
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>

            <View style={{flex: 1, marginRight: 15}} onTouchStart={() => setEditType(3)}>
              <View style={{flexDirection: "row"}}>
                <SubTitle title={"?????????"} iconName={"clock"}/>
                <Badge containerStyle={{marginLeft: 5}}/>
              </View>
              <Text style={{
                fontSize: 17,
                textAlign: "center"
              }}>{moment(startTime, 'YYYYMMDDhhmm').format('YY??? MM??? DD??? hh:mm')}</Text>
              <View style={{marginTop: 15, marginBottom: 15, borderBottomWidth: 2, borderColor: "#cdcdd4"}}></View>

            </View>
            <View style={{flex: 1, marginLeft: 15}} onTouchStart={() => setEditType(4)}>
              <View style={{flexDirection: "row"}}>
                <SubTitle title={"?????????"} iconName={"clock"}/>
                <Badge containerStyle={{marginLeft: 5}}/>
              </View>
              <Text style={{
                fontSize: 17,
                textAlign: "center"
              }}>{moment(endTime, 'YYYYMMDDhhmm').format('YY??? MM??? DD??? hh:mm')}</Text>
              <View style={{marginTop: 15, marginBottom: 15, borderBottomWidth: 2, borderColor: "#cdcdd4"}}></View>
            </View>

          </View>

          <View style={{marginBottom: 15}}></View>
          <SubTitle title={"TAG"} iconName={"tags"}/>
          <View style={{flexDirection: "row"}}>
            <Text style={{margin: 3}}>#??????</Text>
            <Text style={{margin: 3}}>#?????????</Text>
            <Text style={{margin: 3}}>#??????</Text>
          </View>

          <View style={{marginTop: 15, marginBottom: 15, borderBottomWidth: 2, borderColor: "#cdcdd4"}}></View>


          <SubTitle title={"???????????? 20"} iconName={"list-ol"}/>
          <ScrollView style={{height: 250}}>
            {["E", "D", "D", "T", "E"].map((v, i) => {
              return (
                <View key={i} style={{height: 40, flexDirection: "row", borderRadius: 10, marginBottom: 15}}>
                  <View style={{
                    flex: 1.5,
                    borderWidth: .3,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: CodeUtil.getTaskColorByStatus(v),
                    borderColor: CodeUtil.getTaskColorByStatus(v),
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10
                  }}>
                    <Text style={{color: "white"}}>?????? ??????</Text>
                  </View>
                  <View style={{
                    flex: 4,
                    borderWidth: .3,
                    borderLeftColor: "white",
                    borderColor: CodeUtil.getTaskColorByStatus(v)
                  }}>

                  </View>
                  <View style={{
                    flex: 1,
                    borderWidth: .3,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: CodeUtil.getTaskColorByStatus(v),
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: CodeUtil.getTaskColorByStatus(v)
                  }}>
                    <Text style={{color: "white"}}>{"12.03"}</Text>
                  </View>
                </View>
              )
            })}
            <View style={{height: 50}}></View>
          </ScrollView>
        </View>
      </ScrollView>


      <BottomSheet isVisible={editType == 3 ? true : false} title="asdf"
                   containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)', height: 200}}>
        <View style={{}} onTouchStart={() => setEditType(3)}>
          <TimePicker onCancle={() => setEditType(0)} timeState={{time: startTime, setTime: setStartTime}}/>
        </View>
      </BottomSheet>


      <BottomSheet widthOverlay={false} isVisible={editType == 4 ? true : false} title="asdf"
                   containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)', height: 200}}>
        <View>
          <TimePicker onCancle={() => setEditType(0)} timeState={{time: endTime, setTime: setEndTime}}/>
        </View>
      </BottomSheet>


      {/* ?????? ?????? */}
      <Overlay overlayStyle={{borderRadius: 20, marginBottom: 200}} isVisible={editType == 1 ? true : false}
               onBackdropPress={() => setEditType(0)}>
        <View style={{width: Dimensions.get("window").width * 0.8, height: 350, flexDirection: "column", padding: 20}}>

          <SubTitle title={"??????"} iconName={"paper-plane"}/>
          <View style={{marginTop: 5, marginBottom: 5, borderBottomWidth: 2, borderColor: "#cdcdd4"}}></View>

          <ScrollView style={{padding: 5}}>
            <TextInput autoFocus={true} multiline={true} style={{height: 200}} value={`?????????(?????????)??? ??????????????? ????????????. 1919??? ???????????? ?????? ???????????? 
                        ??????22 ???????????? ??????????????? ????????? ??????????????? ???????????? ????????? ??????????????? 1935??? ????????? ...`}>

            </TextInput>
          </ScrollView>
          <View style={{flexDirection: "row", justifyContent: "space-around", bottom: 0}}>
            <Button style={{width: 130}} title="??????"/>
            <Button style={{width: 130}} title="??????" onPress={() => setEditType(0)}/>
            {/* <Button style={{width:80}} title="Solid Button" /> */}
          </View>
        </View>
      </Overlay>


      <CommonLoadingActivity isVisible={loadingVisible}/>
    </View>
  )
}
export default TaskDetailScreen;
