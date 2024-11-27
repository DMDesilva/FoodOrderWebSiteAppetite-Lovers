import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { DeleteConfirmComponent } from 'src/app/DialogModal/delete-confirm/delete-confirm.component';
import { CartHeader } from 'src/app/Models/Cart';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit {

  ProData:any;
  ProList:any;
  ImgPath=environment.ImagePath +'Products/';
  SubTotalAmount=0;
  subtot=0;
  usr:any;
  CrtHead:any;
  dialogValue:any;
  paymentType="1";
  //IsbtnEnble=false;

  favoriteSeason: string = "";
  // seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private prod:ProductServiceService,
    private route:Router,
    private elementRef: ElementRef,
    public dialog: MatDialog
 
  ) {
    // this.ProData=JSON.parse(localStorage.getItem('CartInfo')|| '{}');
    this.ProData=localStorage.getItem('CartInfo');
    this.usr=localStorage.getItem('userID');
    
    this.getNew();
 
   }

  ngOnInit(): void {
    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../../assets/admin/js/functions.js";
    this.elementRef.nativeElement.appendChild(s14);
  }


  getNew(){
    this.ProList=JSON.parse(this.ProData);
    
    if(this.ProList!=null){
      this.ProList=this.ProList;    
      this.TotalAmountCal(this.ProList);
      this.CrtHead=new CartHeader();

     
    }else{
      this.toastr.warning("No Product Available"); 
    }

  }

tot=0;
  TotalAmountCal(arr:any){
    for (let i = 0; i < arr.length; i++) {
      this.tot+=arr[i].SubTotal;
    }
    this.SubTotalAmount=this.tot;
  }



  RemoveItem(itms:any){

    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      disableClose:true,  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      this.dialogValue = result.data;
      if(this.dialogValue==1){
        var index = this.ProList.indexOf(itms);
        this.ProList.splice(index, 1);
        this.SubTotalAmount=this.SubTotalAmount-itms.SubTotal;

      }else{
        this.toastr.warning("Delete Failed");
      }
    });




    
  }

  rtn:any;
  CartCheckOut(){
    if(this.ProData==null ){
      this.toastr.warning("No Data Available");
    }
    else if(this.favoriteSeason==""){
      this.toastr.warning("Please Select Payment Type");
    }else{
      this.CrtHead.CustId=this.usr;
      this.CrtHead.TotalPrice= this.SubTotalAmount;
      this.CrtHead.CrtItms=  this.ProList;
      this.CrtHead.PayType= this.favoriteSeason ;

     

      this.prod.SaveOrder(this.CrtHead).then(ret=>{
        this.rtn=ret;
        if(this.rtn.success==1){
          this.toastr.success( this.rtn.message)
          localStorage.removeItem("CartInfo");
          this.ProList=[];
          this.SubTotalAmount=0;
          this.favoriteSeason="";
          this.prod.ProdCount.next(0);

        }else{
          this.toastr.warning("Not Saved");

        }
      });


    }
   
    
  }




}
