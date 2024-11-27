import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

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

  
  ) { 
    this.usrid=localStorage.getItem("userID");
    this.token=localStorage.getItem("auth-token");
   // this.CartItms=localStorage.getItem('CartInfo');

  }

  ngOnInit(): void {
   
    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../../assets/admin/js/functions.js";
    this.elementRef.nativeElement.appendChild(s14);

    this.cateId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.LoadCategWiseFood();

 
   this.CakeType=[ {Id:1,TypeName:"Normal"},{Id:2,TypeName:"BirthDay"}, {Id:3,TypeName:"Anniversary"}];
   this.AgeRange=[ {Id:1,RangeTyp:"All"}, {Id:2,RangeTyp:"Kids"}, {Id:3,RangeTyp:"Teenage"}, {Id:4,RangeTyp:"Adult"}];


    // this.CakeType=this.prod.CakeTypes();
    // this.AgeRange=this.prod.AgeRanges();
     
  }

  LoadCategWiseFood(){
    this.prod.LoadCategWiseFood(this.cateId).then(ret=>{
      this.ProdList=ret;  
    });
  }

  CakeRange:any
  selectedCakeRange(evt:any){
    console.log("@@");
    this.toastr.warning("No Data");
  }
}
