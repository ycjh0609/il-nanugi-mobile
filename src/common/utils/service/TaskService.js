import axios from 'axios';
import commonAxios from "../axios/commonAxios";
import {getStoreItem} from "../store/commonStore";

const TaskService = {

    getMyTasks: () =>{
        let userInfo = getStoreItem("userInfo");
        return commonAxios.get(`/tasks?userId=${userInfo.id}`);
    }
}

export default TaskService;