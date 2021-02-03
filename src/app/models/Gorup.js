

export default class Group {
    constructor(group){
        this.id = group.id || null;
        this.name = group.name;
        this.startDate = group.startDate;
        this.endDate = group.endDate;
        this.status = group.status;
        this.color = group.color;
        this.groupParticipants = group.groupParticipants || [];
    }
    addParticipant(participant){
    
    }

    validator(){
        let valid = {message:"",field:"",result:true};
        
    }
}