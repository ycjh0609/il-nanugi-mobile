import commonStyle from "../../styles/commonStyle";


const CodeUtil ={

    /*---------------------------------------*/
    //1) TASK
    /*---------------------------------------*/
    TASK_STATUS:{
        TODO:"T",DOING:"D",END:"E",
    },
    TASK_STATUS_TEXT:{
        END:"종료",TODO:"예정",DOING:"진행"
    },
    TASK_SORT_TYPE:{
        BY_ENDTIME:0,BY_STATUS:1,BY_GROUP_ID:2,
    },
    TASK_STATUS_COLOR:{
        TODO:"#999793",DOING:"#f5ad42",END:commonStyle.oneTextColor
    },


    /*---------------------------------------*/
    //3) GROUP
    /*---------------------------------------*/
    GROUP_PARTICIPANT_ROLE_TYPE_TEXT:{
        LEADER:"팀장",MEMBER:"팀원"
    },
    GROUP_PARTICIPANT_ROLE_TYPE:{
        LEADER:"LEADER",MEMBER:"MEMBER"
    }

}
CodeUtil.getTaskTextByStatus = (status) =>{
    if (status === CodeUtil.TASK_STATUS.TODO) return CodeUtil.TASK_STATUS_TEXT.TODO;
    if (status === CodeUtil.TASK_STATUS.DOING) return CodeUtil.TASK_STATUS_TEXT.DOING;
    if (status === CodeUtil.TASK_STATUS.END) return CodeUtil.TASK_STATUS_TEXT.END;
}
CodeUtil.getTaskColorByStatus = (status)=>{
    if (status === CodeUtil.TASK_STATUS.TODO) return CodeUtil.TASK_STATUS_COLOR.TODO;
    if (status === CodeUtil.TASK_STATUS.DOING) return CodeUtil.TASK_STATUS_COLOR.DOING;
    if (status === CodeUtil.TASK_STATUS.END) return CodeUtil.TASK_STATUS_COLOR.END;

}

export default CodeUtil;