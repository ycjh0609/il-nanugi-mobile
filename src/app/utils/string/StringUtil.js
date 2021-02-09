import { trim, upperCase } from "lodash";



const StringUtil = {
    
    toQuery:(payload)=>{
        return Object.entries(payload).map(e => e.join('=')).join('&');
    },

    createSummarizeName: (name,withSpace=false) => {
        let space = withSpace? " ":"";
        name = upperCase(name);
        let temp = name.split(" ").map(n=>trim(n)) ;
        if (temp.length == 1) {
            return temp.substring(0, 2);
        } else if (temp.length > 1) {
            return temp[0].substring(0, 1) + space + temp[1].substring(0, 1);
        }
    }
}
export default StringUtil;