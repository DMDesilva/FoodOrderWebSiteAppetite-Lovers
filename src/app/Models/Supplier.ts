export class Supplier{
    public Id: any;
    public SName:string;
    public SAddress:string;
    public SMobileNo:number;
    public SEmail:string;
    public IsActive:number;
    public SupMaterial:number;
   
       constructor(){
           this.Id=0;
           this.SName="";
           this.SAddress="";
           this.SMobileNo=0;
           this.SEmail="";         
           this.IsActive=1;
           this.SupMaterial=0;
       }
}