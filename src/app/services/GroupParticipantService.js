import axios from 'axios';
import { Group } from 'react-native';
import commonAxios from "../utils/axios/commonAxios";
import {getStoreItem} from "../utils/store/commonStore";
import validator from "validator";
import CodeUtil from '../utils/code/CodeUtil';



const GroupParticipantService = {
    /*-------------------------------------------------------------------------------
    * 1) Requests
    *-------------------------------------------------------------------------------*/
   /**
     * 해당 팀에서 유저(참여자)를삭제한다.
     * @param {*} participant {userId,groupId}
     * @returns participant
     */
    getParticipant: (participant) =>{
        return commonAxios.get(`/groups/${participant.groupId}/users/${participant.userId}/participants`)
    },
    /**
     * 팀 내 참여자를 추가한다.
     * @param {*} participant {userId, groupId, roleType}
     * @returns participant
     */
    addParticipant: (participant) =>{
        return commonAxios.post(`/gropup/${participant.gorupId}/users/${participant.userId}/participants`,participant);
    },
    /**
     * 해당 팀에서 유저(참여자)를 삭제한다.
     * @param {*} participant {userId,groupId}
     * @returns participantId 
     */
    removeParticipant: (participant) =>{
        return commonAxios.delete(`/gropup/${participant.gorupId}/users/${participant.userId}/participants`,participant);
    },
    /**
     * 참여자 정보를 업데이트한다.
     * @param {Object} participant {userId, groupId, roleType}
     * @returns participant
     */
    updateeParticipant: (participant) =>{
        return commonAxios.put(`/gropup/${participant.gorupId}/users/${participant.userId}/participants`,participant);
    },
    /*-------------------------------------------------------------------------------
    * 2) Action Requests
    *-------------------------------------------------------------------------------*/
    /**
    * toUserId 에게 리더를 위임한다.
    * @param {Object} param {toUserId,userId,groupId}
    */
    delegateLeader: async (param) =>{
        return commonAxios.put(`/groups/${param.groupId}/users/${param.userId}/participants/delegate-leader`,param)
    }

}

export default GroupService;