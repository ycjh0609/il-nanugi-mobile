import axios from 'axios';
import commonAxios from "../utils/axios/commonAxios";
import {getStoreItem} from "../utils/store/commonStore";

const GroupService = {

    getMyGroups: () =>{
        let userInfo = getStoreItem("userInfo");
        return commonAxios.get(`/groups?userId=${userInfo.id}`);
    }
}

export default GroupService;