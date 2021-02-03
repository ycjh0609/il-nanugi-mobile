import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";

import { deleteStoreWatcher, useStoreState } from '../utils/store/commonStore';

import CommonTop from "../components/common/CommonTop";
import GroupDashboard from "../components/group/GroupDashboard";
import ToDoList from "../components/to-do-list/ToDoList";

import GroupService from "../services/GroupService"
import TaskService from "../services/TaskService"
import { TouchableOpacity } from 'react-native-gesture-handler';
import GroupList from '../components/group/GroupList';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.22
 * Edit By     : Kwak ji hoon 
 * Description : Group List Screen
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

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
const GroupListScreen = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [userInfo, setUserInfo] = useStoreState("userInfo", useState);
    const [groups,setGroups] = useState([]);

    const fetchData = useCallback(()=>{
        (async ()=>{
            try{
                let g= await GroupService.getMyGroups();
                setGroups(g.data);
            }catch(e){
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
            <CommonTop />
            {/* <GroupDashboard items={{tasks,groups}} /> */}
            <GroupList navigation={navigation} groupsState={{groups,setGroups}}/>
        </View>
    )
}
export default GroupListScreen;