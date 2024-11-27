import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartDetails } from 'src/app/Models/Cart';
import { Product } from 'src/app/Models/Product';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addto-cart',
  templateUrl: './addto-cart.component.html',
  styleUrls: ['./addto-cart.component.scss']
})
export class AddtoCartComponent implements OnInit {

  ProId:any;
  prodata:any;
  pro:any;
  image:any;
  QtyValue=0;
  crt:any=[];

  constructor(
    public dialogRef: MatDialogRef<AddtoCartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
   
    private toastr:ToastrService,
    private prod:ProductServiceService,
    private log:LoginServiceService,
    private route:Router,

  ) { 
    this.ProId = data.pageValue;

  }

  ngOnInit(): void {
    this.pro=new Product();
    this.crt=new CartDetails();
    this.LoadProdcuts();
    // console.log("pro", this.crt);

  }

  LoadProdcuts(){
    this.prod.LoadProducts(1,this.ProId ).then(ret=>{
      this.prodata=ret;
      this.pro=this.prodata[0];
      this.image=environment.ImagePath + "Products/"+ this.prodata[0].ProImage;
      
    });
  }

  TotalPrice=0;
  QtyIncrement(){
    // if(this.pro.Qty<this.QtyValue){
    //   this.toastr.warning("Not Enough Qty At Now");
    // }else if(this.pro.Qty >= this.pro.ReQty){
    //   this.toastr.warning("Can't Order At Now, Not Enough Qty");
    // }
    // else{
    //   this.QtyValue=this.QtyValue+1;
    //   this.TotalPrice=this.pro.SellPrice*this.QtyValue;  
    // }

    this.QtyValue=this.QtyValue+1;
    this.TotalPrice=this.pro.SellPrice*this.QtyValue;  
    console.log(this.pro.Qty ," ",  this.pro.ReQty);
  }

  QtyDecrement(){
    if(this.QtyValue<= 0){
      this.toastr.warning("Qty Value Less Than 0");
    }else{
      this.QtyValue=this.QtyValue-1;
      this.TotalPrice=this.pro.SellPrice*this.QtyValue;    
    } 
  }

  
  AddtoCart(){

    // if(this.crt.Id==this.pro.Id){
    //   this.crt.Qty= this.crt.Qty+this.QtyValue;
    //   this.crt.SubTotal=this.crt.SubTotal+this.TotalPrice
    // }else{
    //   this.crt.Id= this.pro.Id;
    //   this.crt.CateId= this.pro.CateId;
    //   this.crt.ProName= this.pro.ProName;
    //   this.crt.Qty=this.QtyValue;
    //   this.crt.CostPrice= this.pro.CostPrice;
    //   this.crt.SellPrice= this.pro.SellPrice;
    //   this.crt.SubTotal=this.TotalPrice; 
    // }

    if(this.QtyValue==0){
      this.toastr.warning("Please Add Product Qty");
    }else{
      this.crt.Id= this.pro.Id;
      this.crt.CateId= this.pro.CateId;
      this.crt.ProName= this.pro.ProName;
      this.crt.Qty=this.QtyValue;
      this.crt.CostPrice= this.pro.CostPrice;
      this.crt.SellPrice= this.pro.SellPrice;
      this.crt.SubTotal=this.TotalPrice; 
      this.crt.ProImage=this.pro.ProImage; 
      
      this.dialogRef.close({ event: 'close', data: this.crt });
  
    }

 
  
  }


  Close(){
    this.dialogRef.close({ event: 'close'});
  }



}
