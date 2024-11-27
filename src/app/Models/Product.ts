export class Product{
    public Id: number;
    public CateId: number;
    public CakeTypId: number;
    public CakeAgeRange: number;
    public ProName:string;
    public ProDetails:string;
    public Qty:number;
    public ReQty:number;
    public CostPrice:number;
    public SellPrice:number;
    public ProImage:string 
    public IsActive:number;
   
       constructor(){
           this.Id=0;
           this.CateId=0;
           this.CakeTypId=0;
           this.CakeAgeRange=0;
           
           this.ProName="";
           this.ProDetails="";
           this.Qty=0;
           this.ReQty=0;
           this.CostPrice=0;
           this.SellPrice=0;
           this.ProImage="";
           this.IsActive=1;
       }
}