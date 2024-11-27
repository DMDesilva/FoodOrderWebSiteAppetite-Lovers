import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderConfirmComponent } from 'src/app/DialogModal/order-confirm/order-confirm.component';
import { OrderDetailsComponent } from 'src/app/DialogModal/order-details/order-details.component';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  _search="";

constructor(
    private route:Router,
    private elementRef: ElementRef,
    private toastr:ToastrService,
    private log:LoginServiceService,
    private pro:ProductServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.LoadOrders();
    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);

  }

  

  ApproveOrder(OrdData:any){
    const dialogRef = this.dialog.open(OrderConfirmComponent, {
      
      disableClose:true,
     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      this.dialogValue = result.data;
      if(this.dialogValue==1){
 //       console.log(OrdData)
        this.pro.OrderConfirm(OrdData).then(ret=>{
          this.rtndta=ret;
         
          if(this.rtndta.success==1){
           
            this.toastr.success(this.rtndta.message);
            this.LoadOrders();
            window.location.reload();
          }else{
            this.toastr.warning("Order Approve Failed");
          }
        })
      }else{
        this.toastr.warning("Diable Cansel");
      }
  
    });
  }


OrderData:any;
  LoadOrders(){
    this.pro.LoadOrders(0).then(ret=>{
      this.OrderData=ret;
   
    },erros=>{
      //this.toastr.warning("No Orders Available ");
    });
  }

  dialogValue=0;
  rtndta:any;
  OpenOrderIms(id:any){
    const dialogRef = this.dialog.open(OrderDetailsComponent, {   
      disableClose:true,
      // height:'70%',
       width:'50%',
      data: { pageValue: id }  
    });
  
    dialogRef.afterClosed().subscribe(result => {    
      this.dialogValue = result.data;   
    });
  }




}
