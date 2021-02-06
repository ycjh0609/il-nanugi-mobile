


const StringUtil = {
    
    toQuery:(payload)=>{
        return Object.entries(payload).map(e => e.join('=')).join('&');
    },
}