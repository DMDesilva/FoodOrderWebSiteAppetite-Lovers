export class CartHeader{

    public CustId:number;
    public TotalPrice:number;
    public CrtItms:any;
    public IsActive:number;
    public PayType:string;

    constructor(){
        this.CustId=0;
        this.TotalPrice=0;  
        this.CrtItms=[];  
        this.IsActive=1;  
        this.PayType="";  
    }
}


export class CartDetails{

    public Id: number;
    public CateId: number;
    public ProName:string;
    public Qty:number;
    public CostPrice:number;
    public SellPrice:number;
    public SubTotal:number;
    public ProImage:string 

    constructor(){
        this.Id=0;
        this.CateId=0;
        this.ProName="";
        this.Qty=0;
        this.CostPrice=0;
        this.SellPrice=0;
        this.SubTotal=0;
        this.ProImage="";
    }
}