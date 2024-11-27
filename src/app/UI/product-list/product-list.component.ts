import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';
import { LoginInfoComponent } from 'src/app/DialogModal/login-info/login-info.component';
import { AddtoCartComponent } from 'src/app/DialogModal/addto-cart/addto-cart.component';

import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  cateId:any;
  ProdList:any=[];
  usrid:any;
  token:any;
  ImgPath=environment.ImagePath +'Products/';
  CartItms:any=[];
  CakeType:any=[];
  AgeRange:any=[];
  ProdCount=0;
  ProdCategName="";
 


  constructor(
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private prod:ProductServiceService,
    private route:Router,
    private elementRef: ElementRef,
    private dialog: MatDialog,
    private location: Location
  
  ) { 
    this.usrid=localStorage.getItem("userID");
    this.token=localStorage.getItem("auth-token");
  
    this.prod.ProdCategory.subscribe(ret=>{
      this.cateId=ret;
      this.LoadCategWiseFood();
    });

  }

  ngOnInit(): void {
   
    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../../assets/admin/js/functions.js";
    this.elementRef.nativeElement.appendChild(s14);

    //this.cateId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    
    this.CakeType=this.prod.CakeTypes();
    this.AgeRange=this.prod.AgeRanges();
 
  }

  ProdList1:any;
  LoadCategWiseFood(){
    this.prod.LoadCategWiseFood(this.cateId).then(ret=>{
      this.ProdList1=ret;  
     
      if( this.ProdList==null){
      //  this.toastr.warning("No Data");
        this.ProdList=[];
      }else{
        this.ProdList=this.ProdList1;
      }
    },erro=>{
      this.toastr.warning("No Data");
      this.ProdList=[];
    });
  }

  CakeTyp:any;
  BirthDayCake:any;
  BirthDayCakeTypes:any;
  ProductList:any;
  selectedCakeType(id:number){

    this.BirthDayCake=id;
  
    if(id==0){
      this.ProdList=this.ProdList1;
    }else{
      
      this.ProductList =  this.ProdList1.filter((caketyp:any) => {
        return caketyp.CakeTypId == String(id) ;
      });

      if(this.ProductList!=null){
        this.ProdList=this.ProductList;
        if(id==2){
          this.BirthDayCakeTypes=this.ProductList;
        }
      }else{
        this.ProdList=[];
        this.toastr.warning("No Data");
      }

     
    }
    
  }

  CakeRange:any;
  BirthDayCakeAgeRange:any;
  selectedCakeRange(id:number){
  
    this.toastr.warning("No Data");

    this.BirthDayCakeAgeRange =  this.BirthDayCakeTypes.filter((caketyp:any) => {
      return caketyp.CakeAgeRange == id ;
    });

    if(this.BirthDayCakeAgeRange!=null){
      this.ProdList=this.BirthDayCakeAgeRange;
    }else{
      this.ProdList=[];
      this.toastr.warning("No Data");
    }


  }


  
  dialogValue:any;
  CartValue:any;
  rtndta:any;
  Cart:any=[];
  isTest=0;


  OrderNow(proid:number){
    if(this.token==""|| this.token==null){
      const dialogRef = this.dialog.open(LoginInfoComponent, {    
        disableClose:true,       
      });
    
      dialogRef.afterClosed().subscribe(result => {   
        this.dialogValue = result.data;
        if(this.dialogValue==1){
          this.route.navigate(["login"]);
        }else{
         this.toastr.warning("Please Login First");
        }
      });
    }

    else{
      const dialogRef = this.dialog.open(AddtoCartComponent, {    
        disableClose:true,  
        position:{right:'0'},
        height:'100%',
        data: { pageValue: proid }     
      });
    
      dialogRef.afterClosed().subscribe(result => {   
        this.CartValue = result.data;
          
        if(this.CartValue!=undefined){
         
          if(this.Cart.length==0 || this.Cart.length==null){
            this.ProdCount=this.ProdCount+1;
            this.prod.ProdCount.next(this.ProdCount);
            this.Cart.push(this.CartValue);
            
          }
          else{ 
              for (let i = 0; i < this.Cart.length; i++) {
  
                if( this.Cart[i].Id === this.CartValue.Id){         
                    this.isTest=1;
                    this.Cart[i].Qty=this.Cart[i].Qty+this.CartValue.Qty;
                    this.Cart[i].SubTotal=this.Cart[i].SellPrice *this.Cart[i].Qty;  
                    break;
                  
                }else{
                  this.isTest=0;
                }       
              }
  
              
              if(this.isTest==0){
                this.ProdCount=this.ProdCount+1;
                this.prod.ProdCount.next(this.ProdCount);
                this.Cart.push(this.CartValue);
              }
           
          }

          localStorage.setItem('CartInfo',JSON.stringify(this.Cart));
          
        }else{
          this.prod.ProdCount.next(0);
        }

        

      });
    }
  }





}
