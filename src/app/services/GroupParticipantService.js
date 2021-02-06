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
     * 해당 팀에 참여중인 참여자를 조회한다
     * @param {Number} groupId 
     * @returns [participant]
     */
    getParticipants: (groupId) =>{
        return commonAxios.get(`/groups/${groupId}/users`);
    },
    /**
     * 팀 내 참여자를 추가한다.
     * @param {Object} participant {userId, groupId, roleType}
     * @returns participant
     */
    addParticipant: (participant) =>{
        return commonAxios.post(`/gropups/${participant.gorupId}/users`,participant);
    },
    /**
     * 해당 팀에서 유저(참여자)를 삭제한다.
     * @param {Object} participant {userId,groupId}
     * @returns participantId 
     */
    removeParticipant: (participant) =>{
        return commonAxios.delete(`/gropups/${participant.gorupId}/users/${participant.userId}`);
    },
    /**
     * 참여자 정보를 업데이트한다.
     * @param {Object} participant {userId, groupId, roleType}
     * @returns participant
     */
    updateeParticipant: (participant) =>{
        return commonAxios.put(`/gropups/${participant.gorupId}/users/${participant.userId}`,participant);
    },
    /*-------------------------------------------------------------------------------
    * 2) Action Requests
    *-------------------------------------------------------------------------------*/
    /**
    * toUserId 에게 리더를 위임한다.
    * @param {Object} param {userId,groupId} (signedUser 이용)
    */
    delegateLeader: async (param) =>{
        return commonAxios.put(`/groups/${param.groupId}/users/delegate-leader`,param)
    }

}

export default GroupService;