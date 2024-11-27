import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rpt-product',
  templateUrl: './rpt-product.component.html',
  styleUrls: ['./rpt-product.component.scss']
})
export class RptProductComponent implements OnInit {

  Category:any;
  _search ="";
  ProData:any;
  catedata:any;
  imagePath=environment.ImagePath+'Products/';

  constructor(
    private route:Router,
    private elementRef: ElementRef,
    private tost:ToastrService,
    private pro:ProductServiceService,
    private log:LoginServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.LoadProduct();
    this.LoadCategory();
    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);

  }

  LoadCategory(){
    this.pro.LoadCategory(0,0).then(ret=>{
      this.catedata=ret;
      this.catedata.push({"Id":'0',"CountId":'0',"CategName":'All'});
     
    });
  }

  ProData1:any;

  LoadProduct(){
    this.pro.LoadProducts(0,0).then(ret=>{
      this.ProData=ret;
      this.ProData1=ret;
     
    },error=>{
      this.tost.success("No Data");
    });
  }

  filtData:any;
  ProductCategWise(evnt:any){
    this.Category=evnt.target.value;

    if(this.Category==0){
      this.ProData= this.ProData1;
    }else{
      this.filtData=this.ProData1.filter((usr:any)=>{
        return usr.CateId==this.Category;
        
      });
  
      if(this.filtData==null){
        this.tost.warning("No Data");
        this.ProData=[];
      }{
      
        this.ProData=this.filtData;
      }
    }



  }


}
