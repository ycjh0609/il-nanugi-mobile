import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import commonAxios from "../../common/utils/axios/commonAxios"
import { deleteStoreWatcher, useStoreState } from '../../common/utils/store/commonStore';

import TopNavigation from "./TopNavigation";
import TopDashboard from './TopDashboard';

import TopNavigationNew from "./TopNavigationNew";
import TopDashboardNew from './TopDashboardNew';
import SimpleBoard from "./simple-board/SimpleBoard";

import Dashboard from "./Dashboard";
import GroupService from '../../common/utils/service/GroupService';
import TaskService from '../../common/utils/service/TaskService';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
        { id: 1, groupId:1 ,group:{id:1,name:"일 나누기 개발", color:"#32a85d"}, status: "A", title: "모바일 개발", endTime: "202012200000",participants:[{userid:1,name:"곽지훈"},{userId:2,name:"Tina Kim"},{userId:3,name:"Choi Flower"}] },
        { id: 3, groupId:1 ,group:{id:1,name:"일 나누기 개발", color:"#32a85d"}, status: "A", title: "백엔드 개발", endTime: "202112112341",participants:[{userid:1,name:"Kwak Tom"}]  },
        { id: 2, groupId:2 ,group:{id:2,name:"Sweet Home", color:"#a88132"}, status: "E", title: "꽃님이 산책", endTime: "201911212341",participants:[{userid:1,name:"Choi Flower"}]  },
        { id: 6, groupId:3, group:{id:2,name:"Sweet Home", color:"#a88132"}, status: "E", title: "저녁 상 차리기", endTime: "201812311341",participants:[{userId:2,name:"Tina Kim"},{userId:3,name:"Choi Flower"}]  },
        { id: 8, groupId:1, group:{id:1,name:"일 나누기 개발", color:"#32a85d"},status: "E", title: "화면개발", endTime: "201312312331",participants:[{userid:1,name:"Kwak Tom"}] },
        { id: 9, groupId:4, group:{id:4,name:"개인 프로젝트", color:"#7f71e3"},status: "A", title: "테스트 하기", endTime: "202312312331",participants:[{userid:1,name:"Kwak Tom"}] },
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
TouchableOpacity.activeOpacity=0.1;
 const HomeNew = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const [tasks,setTasks] = useState([]);
    const [groups,setGroups] = useState([]);
    const [currentPage,setCurrentPage] = useState(0);

    const fetchData = useCallback(()=>{
        (async ()=>{
            try{
                let g= await GroupService.getMyGroups();
                let t= await TaskService.getMyTasks();
                setGroups(g.data);
                setTasks(t.data);
            }catch(e){
                console.log(e)
                setTasks(getTasks());
                setGroups(getGroups());
            }
        })();   
    })
    useEffect(fetchData, []);

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View>
            <TopNavigationNew currentPage={currentPage} />
            <TopDashboardNew items={{tasks,groups}} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <SimpleBoard tasks={tasks} groups={groups} navigation={navigation} />
        </View>
    )
}
export default HomeNew;