export class User{
    public UsrId: any;
    public FName:string;
    public LName:string;
    public Email:string;
    public Password:string;
    public cPassword:string;
    public Address:string 
    public MobileNo:string;
    public UsrImage:string 
    public UsrType:number;
    public IsActive:number;
   
       constructor(){
            this.UsrId=0;
           this.FName="";
           this.LName="";
           this.Email="";
           this.Password="";
           this.cPassword="";
           this.Address="";
           this.MobileNo="";
           this.UsrImage="";
           this.UsrType=0;
           this.IsActive=1;
       }
}

export class UsrNameImage{
    public UsrImage:string;
    public FName:string;

    constructor(){
         this.UsrImage="" ;
         this.FName="";
    }
}
