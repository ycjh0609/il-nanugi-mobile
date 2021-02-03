import axios from 'axios';
import { Group } from 'react-native';
import commonAxios from "../utils/axios/commonAxios";
import {getStoreItem} from "../utils/store/commonStore";
import validator from "validator";
import CodeUtil from '../utils/code/CodeUtil';



const GroupService = {
    /*-------------------------------------------------------------------------------
    * 1) Requests
    *-------------------------------------------------------------------------------*/
    /**
     * 그룹을 조회한다.
     * @param {Number} groupId 
     * @return group
     */
    getGroupOne: (groupId)=>{
        return commonAxios.get(`/groups/${groupId}`)  
    },
    /**
     * 그룹을 생성핟다
     * @param {Object} group 
     * @returns group
     */
    createGroup:(group) =>{
        return commonAxios.post(`/groups`,group)
    },
    /**
     * 그룹 내역을 업데이트 한다.
     * @param {Object} group {groupId, ... }
     * @returns group
     */
    updateGroup: (group) =>{
        return commonAxios.put(`/groups/${group.id}`,group)
    },
    /**
     * 그룹을 삭제한다.
     * @param {Number} groupId 
     * @returns groupId
     */
    deleteGroup: (groupId) =>{
        return commonAxios.delete(`/groups/${groupId}`)
    },
    /*-------------------------------------------------------------------------------
    * 2) Action Requests
    *-------------------------------------------------------------------------------*/
    /**
     * 내가 참여중인 그룹 리스트를 조회힌다 (back-end signedUser 를 이용)
     * @returns group
     */
    getMyGroups:() =>{
        //let userInfo = getStoreItem("userInfo");
        return commonAxios.get(`/groups/me`);
    },


}

export default GroupService;