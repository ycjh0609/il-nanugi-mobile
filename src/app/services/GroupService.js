import axios from 'axios';
import { Group } from 'react-native';
import commonAxios from "../utils/axios/commonAxios";
import {getStoreItem} from "../utils/store/commonStore";


const GroupService = {

    getMyGroups: () =>{
        let userInfo = getStoreItem("userInfo");
        return commonAxios.get(`/groups`);
    },
    getGroupDetail: (groupId)=>{
        return commonAxios.get(`/groups?id=${groupId}`)  
    },
    updateGroup: (group) =>{
        return commonAxios.put("/groups")
    },

    
    

}

export default GroupService;