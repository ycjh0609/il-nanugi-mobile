import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";

import { deleteStoreWatcher, useStoreState } from '../utils/store/commonStore';

import HomeTop from "../components/home/HomeTop";
import ToDoDashboard from "../components/to-do-list/ToDoDashboard";
import ToDoList from "../components/to-do-list/ToDoList";
import CommonTop from "../components/common/CommonTop"
import CommonLoadingActivity from "../components/common/CommonLoadingActivity"

import GroupService from "../services/GroupService"
import TaskService from "../services/TaskService"
import { TouchableOpacity } from 'react-native-gesture-handler';
import LocalCache from '../services/LocalCache';
import { Alert } from 'react-native';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : Kwak ji hoon 
 * Description : Todo List
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
function getTasks() {

    let temp = [
        { id: 1, groupId:1 ,group:{id:1,name:"일 나누기 개발", color:"#32a85d"}, status: "T", title: "모바일 개발", endTime:   "20201220000",participants:[{userid:1,name:"곽지훈"},{userId:2,name:"Tina Kim"},{userId:3,name:"Choi Flower"}] },
        { id: 3, groupId:1 ,group:{id:1,name:"일 나누기 개발", color:"#32a85d"}, status: "D", title: "백엔드 개발", endTime:   "202112112341",participants:[{userid:1,name:"Kwak Tom"}]  },
        { id: 2, groupId:2 ,group:{id:2,name:"Sweet Home", color:"#a88132"}, status: "E", title: "꽃님이 산책", endTime:    "201911212341",participants:[{userid:1,name:"Choi Flower"}]  },
        { id: 6, groupId:3, group:{id:2,name:"Sweet Home", color:"#a88132"}, status: "D", title: "저녁 상 차리기", endTime: "201812311341",participants:[{userId:2,name:"Tina Kim"},{userId:3,name:"Choi Flower"}]  },
        { id: 8, groupId:1, group:{id:1,name:"일 나누기 개발", color:"#32a85d"},status: "E", title: "화면개발", endTime:        "201312312331",participants:[{userid:1,name:"Kwak Tom"}] },
        { id: 9, groupId:4, group:{id:4,name:"개인 프로젝트", color:"#7f71e3"},status: "T", title: "테스트 하기", endTime:       "202312312331",participants:[{userid:1,name:"Kwak Tom"}] },
    ]
    return temp;
}
function getGroups(){
    let temp = [
        {id:1,name:"일 나누기 개발",color:"#32a85d",participants:[{userid:1,name:"곽지훈"},{userId:2,name:"Tina Kim"},{userId:3,name:"Choi Flower"}]  },
        {id:2,name:"Sweet Home",color:"#a88132",participants:[{userId:2,name:"Tina Kim"},{userId:3,name:"Choi Flower"}]   },
        {id:3,name:"경영과학 2조",color:"#32a89c" ,participants:[{userid:1,name:"곽지훈"},{userId:3,name:"Choi Flower"}]    },
        {id:4,name:"개인 프로젝트",color:"#7f71e3" ,participants:[{userId:3,name:"Choi Flower"}]   },
        {id:5,name:"To Do List",color:"#3266a8" ,participants:[{userid:1,name:"곽지훈"}]  }
    ]
    return temp;
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ToDoListScreen = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks Variables
    *-------------------------------------------------------------------------------*/
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const [tasks,setTasks] = useState([]);
    const [groups,setGroups] = useState([]);
    const [loadingVisible,setLoadingVisible] = useState(false);
    /*-------------------------------------------------------------------------------
    * 03-2) fetch Methods
    *-------------------------------------------------------------------------------*/
    const initializeData = useCallback(()=>{
        (async ()=>{
            try{

                setLoadingVisible(true);
                let fetchedMyTasks= (await fetchMyTasks()).data.contents;
                let fetchedMyGroups= (await fetchMyGroups()).data.contents;
                setTasks(fetchedMyTasks);
                setGroups(fetchedMyGroups);
            }catch(e){
                setTasks(getTasks());
                setGroups(getGroups());
            }finally{
                setTimeout(()=>{
                    setLoadingVisible(false);
                },100)
            }
        })();   
    });
    const fetchMyTasks = useCallback(()=>{
        return TaskService.getMyTasks();
    })
    const fetchMyGroups = useCallback(()=>{
        return GroupService.getMyGroups();
    })



    
    /*-------------------------------------------------------------------------------
    * 03-3) Hooks Effects
    *-------------------------------------------------------------------------------*/
    //useEffect(initializeData, []);
    useEffect(()=>{
        //hash값으로 버전 체크 후 업데이트 하도록 하자
        let unsubscribe = navigation.addListener('focus', () => {
            initializeData();
        });
        return  unsubscribe;
    },[navigation])
    useEffect(()=>{
        
    },[])
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View>
            <CommonTop/>
            <ToDoDashboard navigation={navigation} items={{tasks,groups}} />
            <ToDoList items={{tasks,groups}} setItems={{setTasks,setGroups}} navigation={navigation} />
            <CommonLoadingActivity isVisible={loadingVisible}/>
        </View>
    )
}
export default ToDoListScreen;