import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  Customer="";
  proImge:any;
  OrderId:number=0;
  ProductData:any;

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    private pro:ProductServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
   
  ) { 
    this.OrderId = data.pageValue;
    this.proImge =environment.ImagePath+'Products/';

   this.pro.LoadOrderItmDetails(this.OrderId).then(ret=>{
    this.ProductData=ret;
   
   });


  }

  ngOnInit(): void {
  }



  

  Ok(id:number){

  }


}
