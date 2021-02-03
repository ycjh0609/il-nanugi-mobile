import GroupParticipant from "./GroupParticipant";


class Group {
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
        if (participant instanceof GroupParticipant){
            this.groupParticipants.add(new GroupParticipant(participant));
        }else{
            throw new Error("participant must GroupParticipant")
        }
    }
    validator(){
        let valid = {message:"",field:"",result:true};
        
    }
}
Group.prototype.constraints = {
    
}


export default Group;