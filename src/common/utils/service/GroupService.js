import axios from 'axios';
import commonAxios from "../axios/commonAxios";
import {getStoreItem} from "../store/commonStore";

const GroupService = {

    getMyGroups: () =>{
        let userInfo = getStoreItem("userInfo");
        return commonAxios.get(`/groups?userId=${userInfo.id}`);
    }
}

export default GroupService;