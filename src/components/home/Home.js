import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { deleteStoreWatcher, useStoreState } from '../../common/utils/store/commonStore';
import TopNavigation from "./TopNavigation";
import TopDashboard from './TopDashboard';
import Dashboard from "./Dashboard";
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : Kwak ji hoon 
 * Description : Honme Main
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
        { id: 1, groupId:1 ,group:{id:1,name:"일 나누기 개발"}, taskStatus: "A", title: "모바일 개발", deadlineTime: "202012200000", color:"#32a85d",participants:[{userid:1,name:"곽지훈"},{userId:2,name:"Tina Kim"},{userId:3,name:"Choi Flower"}] },
        { id: 3, groupId:1 ,group:{id:1,name:"일 나누기 개발"}, taskStatus: "A", title: "백엔드 개발", deadlineTime: "202112112341", color:"#32a85d",participants:[{userid:1,name:"Kwak Tom"}]  },
        { id: 2, groupId:2 ,group:{id:2,name:"Sweet Home"}, taskStatus: "E", title: "꽃님이 산책", deadlineTime: "201911212341", color:"#a88132",participants:[{userid:1,name:"Choi Flower"}]  },
        { id: 6, groupId:3, group:{id:2,name:"Sweet Home"}, taskStatus: "E", title: "저녁 상 차리기", deadlineTime: "201812311341", color:"#a88132",participants:[{userId:2,name:"Tina Kim"},{userId:3,name:"Choi Flower"}]  },
        { id: 8, groupId:1, group:{id:1,name:"일 나누기 개발"},taskStatus: "E", title: "화면개발", deadlineTime: "201312312331", color:"#32a85d",participants:[{userid:1,name:"Kwak Tom"}] },
        { id: 9, groupId:4, group:{id:4,name:"개인 프로젝트"},taskStatus: "A", title: "테스트 하기", deadlineTime: "202312312331", color:"#7f71e3",participants:[{userid:1,name:"Kwak Tom"}] },
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
const Home = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const [tasks,setTasks] = useState([]);
    const [groups,setGroups] = useState([]);
    const [currentPage,setCurrentPage] = useState(0);

    useEffect(function fetchTasks(){
        setTasks(getTasks());
        setGroups(getGroups());
    }, []);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View>
            <TopNavigation currentPage={currentPage} />
            <TopDashboard items={{tasks,groups}} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Dashboard navigation={navigation} currentPage={currentPage} setCurrentPage={setCurrentPage} tasks={tasks} groups={groups}/>
        </View>
    )
}
export default Home;