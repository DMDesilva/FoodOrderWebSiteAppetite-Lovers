export class EmployeeMsg{

    public Id:number;
    public UsrId:number;
    public MsgHeader:string;
    public MsgBody:string;
    public MsgStatus:number;
    
    constructor(){
        this.Id=0;
        this.UsrId=0;
        this.MsgHeader="";  
        this.MsgBody="";  
        this.MsgStatus=100;  
          
    }
}