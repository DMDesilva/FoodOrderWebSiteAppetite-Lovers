import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-add-master',
  templateUrl: './category-add-master.component.html',
  styleUrls: ['./category-add-master.component.scss']
})
export class CategoryAddMasterComponent implements OnInit {

  Id:number=0;
  CateId:any; 
  operation="";
  CategName="";
  FileName="";
  IsActive:any;
  Catedata:any;
  retndata:any;
  BtnName="Save";

  Isdisabled=false;

  cate:any={Id:0,CategName:"",IsActive:1};


  constructor(
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private log:ProductServiceService,
    private route:Router,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc:any,
  ) { }

  ngOnInit(): void {
    this.getNew();
    
    var operationType = this.activatedRoute.snapshot.paramMap.get('fun');
    this.CateId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (Number(operationType) == 0) {
      this.BtnName="Save";
      this.operation = "Create";

    } else if (Number(operationType) == 1) {
      this.operation = "Edit";
      this.LoadCategory();
      this.BtnName="Update"; 
    
    } else {
      this.operation = "View";
      this.LoadCategory();
      this.Isdisabled=true;     
      this.BtnName="Save";
    }
  }

  ActivrStatus(){
    if(this.IsActive==true){
      this.IsActive=1;
    }else{
      this.IsActive=0;
    }
  }

  getNew(){
  
    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);
    
  
  }

  LoadCategory(){
    this.log.LoadCategory(1,this.CateId ).then(ret=>{
      this.Catedata=ret;
      this.cate=this.Catedata[0];
   
    });
  }

  SaveNewUser(){
    if(this.cate.CategName==""){
      this.toastr.warning("Please Enter First Name");
    }   
    else{
      if(this.BtnName=="Save") {       
          this.saveFunction();
      }else{
         this.saveFunction();
      }
    }
  }

  

  saveFunction(){
  
    this.log.SaveCategory(this.cate).then(ret=>{
      this.retndata=ret;
     if(this.retndata.success==1){
       this.toastr.success(this.retndata.message)
       this.route.navigate(["category"]);
     }else{
       this.toastr.warning("Save Failed, Trey Again!")
     }
   });
  }

 

  Clear(){
    
  }





}
