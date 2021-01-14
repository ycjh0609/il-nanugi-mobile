

const CodeUtil ={
    TASK_STATUS:{
        END:"E",TODO:"T",DOING:"D",FINISH:"F"
    },
    TASK_STATUS_TEXT:{
        END:"종료",TODO:"예정",DOING:"진행",FINISH:"완료"
    },
    GET_STATUS_TEXT:(status)=>{
        if (status === "E") return "완료";
        if (status === "T") return "예정";
        if (status === "D") return "진행";
        if (status === "F") return "종료";
    }
}

export default CodeUtil;