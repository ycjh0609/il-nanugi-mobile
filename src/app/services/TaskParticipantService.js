import axios from 'axios';
import commonAxios from "../utils/axios/commonAxios";
import { getStoreItem } from "../utils/store/commonStore";
/*

*/
const TaskService = {
    /*-------------------------------------------------------------------------------
    * 1) Requests
    *-------------------------------------------------------------------------------*/
   /**
     * 해당 Task의 담당자들을 조회한다
     * @param {Number} taskId 
     * @returns participant
     */
    getParticipants: (taskId) =>{
        return commonAxios.get(`/tasks/${taskId}/users`)
    },
    /**
     * Task에 담당자를 추가한다.
     * /tasks/{taskId}/users
     * @param {*} participant {userId, taskId, roleType}
     * @returns participant
     */
    addParticipant: (participant) =>{
        return commonAxios.post(`/tasks/${participant.taskId}/users`,participant);
    },
    /**
     * 해당 Task에서 유저(참여자)를 삭제한다.
     * @param {*} participant {userId,taskId}
     * @returns participantId 
     */
    removeParticipant: (participant) =>{
        return commonAxios.delete(`/tasks/${participant.taskId}/users/${participant.userId}`);
    },
    /**
     * 참여자 정보를 업데이트한다.
     * @param {Object} participant {userId, taskId, roleType}
     * @returns participant
     */
    updateeParticipant: (participant) =>{
        return commonAxios.put(`/tasks/${participant.taskId}/users/${participant.userId}`,participant);
    },
    /*-------------------------------------------------------------------------------
    * 2) Action Requests
    *-------------------------------------------------------------------------------*/
   
}

export default TaskService;