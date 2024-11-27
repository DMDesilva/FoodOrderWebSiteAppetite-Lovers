import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from 'src/app/Models/Supplier';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplier-add-master',
  templateUrl: './supplier-add-master.component.html',
  styleUrls: ['./supplier-add-master.component.scss']
})
export class SupplierAddMasterComponent implements OnInit {

  usrId:any; 
  operation="";
  FileName="";
  BtnName="Save";
  image:any;
  Isdisabled=false;
  PwdDisable=false;
  usr:any;
  UserImagData:any;
  UsrTypeList:any;
  retndata:any;
  usrdata:any;
  materils:any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private log:LoginServiceService,
    private prod:ProductServiceService,
    private route:Router,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc:any,
  ) { }

  ngOnInit(): void {
    this.getNew();
    
    var operationType = this.activatedRoute.snapshot.paramMap.get('fun');
    this.usrId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (Number(operationType) == 0) {
      this.BtnName="Save";
      this.operation = "Create";
      
     
    } else if (Number(operationType) == 1) {
      this.operation = "Edit";
      this.LoadSupplier();
      this.BtnName="Update"; 
    
    } else {
      this.operation = "View";
      this.LoadSupplier();
      this.Isdisabled=true;     
      this.BtnName="Save";
    }
  }

  ActivrStatus(){
    if(this.usr.IsActive==true){
      this.usr.IsActive=1;
    }else{
      this.usr.IsActive=0;
    }
  }

  getNew(){
    this.usr=new Supplier();
    this.image='../../../../assets/images/icon/usr.png';

    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);
    
    this.prod.LoadMaterial().subscribe(ret=>{
      this.materils=ret;
    });
    
  }

  LoadSupplier(){
    this.log.LoadSupplier(1,this.usrId ).then(ret=>{
      this.usrdata=ret;
      this.usr=this.usrdata[0];

     
    });
  }

  SaveNewUser(){
  
    this.MobileNumValid(this.usr.SMobileNo);

    if(this.usr.SName==""){
      this.toastr.warning("Please Enter Supplier Company Name");
    }
    else if(this.usr.SupMaterial==0){
    this.toastr.warning("Please Select Suplier Material");
    }
    else if(this.usr.SEmail==""){
      this.toastr.warning("Please Enter Email");
    }
    else if(this.EmailValid(this.usr.SEmail)==0){
      this.toastr.warning("Email Not Valid");
    }
    else if(this.usr.SMobileNo==0){
      this.toastr.warning("Please Enter Phone Number");
    }
    else if(this.IsValiMobileNo==1){
      this.toastr.warning(this.MobileNoErr);
    }
    else if(this.usr.SAddress==""){
      this.toastr.warning("Please Enter Address");
    }
   
    else{
      if(this.BtnName=="Save") {

        console.log("save",this.usr);
        this.saveFunction();

      }else{
         this.saveFunction();
      }

    }
  
  }

 

  saveFunction(){
    this.log.SaveSupplier(this.usr).then(ret=>{
      this.retndata=ret;
     if(this.retndata.success==1){
       this.toastr.success(this.retndata.message)
       this.route.navigate(["supplier"]);
     }else{
       this.toastr.warning("Save Failed, Trey Again!")
     }
   });
  }

 
  Clear(){
    this.usr=new Supplier();
    this.toastr.warning("All field Clear ");
  }

  IsValiMobileNo=0;
  MobileNoErr="";
  MobileNumValid(PhoneNo:string){
    this.IsValiMobileNo=0;
    const lowercaseRegex = new RegExp("(?=.*[a-z])");
    const uppercaseRegex = new RegExp("(?=.*[A-Z])"); 
    if(lowercaseRegex.test(PhoneNo) || uppercaseRegex.test(PhoneNo)){
      this.IsValiMobileNo=1;
      this.MobileNoErr="Can not Enter Text";
  
    } else if(PhoneNo.length>10 || PhoneNo.length<10){
      this.IsValiMobileNo=1;
      this.MobileNoErr="InValid Number"  
    }
  
  }
  
  EmailValid(usermail:string):Number{
    var IsValid=1;
    const emailReg = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    if(emailReg.test(usermail)){
      IsValid=1;
    }
    else{
      IsValid=0;
    }

    return IsValid;
  }



}
