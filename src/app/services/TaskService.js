import axios from 'axios';
import commonAxios from "../utils/axios/commonAxios";
import {getStoreItem} from "../utils/store/commonStore";
/*
{
   "title":"API 명세서 작성",
   "status":"진행중",
   "type":"진행중",
   "importance":"진행중",
   "startTime":"202101312131",
   "endTime":"202102052359",
   "groupId":1,
   "tags":[
      {
         "name":"문서 작성"
      },
      {
         "name":"분석"
      },
      {
         "name":"설계"
      }
   ]
}

*/
const TaskService = {
    presentVersion:"",
    /*-------------------------------------------------------------------------------
    * 1) Requests
    *-------------------------------------------------------------------------------*/
    /**
     * Task를 조회한다.
     * @param {Number} taskId 
     * @return group
     */
    getTaskOne: (taskId)=>{
        return commonAxios.get(`/tasks/${taskId}`)  
    },
    /**
     * Task를 조건별로 조회한다.
     * @param {Number} taskId 
     * @param {Object} payload condition object
     * @return group
     */
    getTasksByParam: (taskId,payload)=>{
        
        let query =  StringUtil.toQuery(payload);
        
        return commonAxios.get(`/tasks/${taskId}?${query}`)  
    },
    /**
     * Task를 생성핟다
     * @param {Object} task 
     * @returns task
     */
    createTask:(task) =>{
        return commonAxios.post(`/tasks`,task)
    },
    /**
     * Task 내역을 업데이트 한다. (부분 수정가능)
     * @param {Object} task {id, ... }
     * @returns task
     */
    updateTask: (task,taskId) =>{
        return commonAxios.put(`/tasks/${taskId}`,task)
    },
    /**
     * 그룹을 삭제한다.
     * @param {Number} taskId 
     * @returns task
     */
    deleteTask: (taskId) =>{
        return commonAxios.delete(`/tasks/${taskId}`)
    },
    /*-------------------------------------------------------------------------------
    * 2) Action Requests
    *-------------------------------------------------------------------------------*/
    /**
     * 나에게 할당된 Task를 조회한다. (back-end signedUser 를 이용)
     * @returns [task]
     */
    getMyTasks:() =>{
        //let userInfo = getStoreItem("userInfo");
        return commonAxios.get(`/tasks/me`);
    },


    addInterceptor: (beforeCallback,afterCallback)=>{
        commonAxios.interceptors.request.use(
            (config) => {
                beforeCallback();
                return config;
            },
            (error) => {
                beforeCallback();
                return Promise.reject(error);
            },
        );

        commonAxios.interceptors.response.use(
            (response) => {
                afterCallback();
                return response;
            },
            (error) => {
                afterCallback();
                return Promise.reject(error);
            },
        );
        

        
    }
}

export default TaskService;