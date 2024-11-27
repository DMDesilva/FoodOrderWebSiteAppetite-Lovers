import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-add-master',
  templateUrl: './user-add-master.component.html',
  styleUrls: ['./user-add-master.component.scss']
})
export class UserAddMasterComponent implements OnInit {

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

  constructor(
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private log:LoginServiceService,
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
      this.LoadUsers();
      this.BtnName="Update"; 
    
    } else {
      this.operation = "View";
      this.LoadUsers();
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
    this.usr=new User();
    this.image='../../../../assets/images/icon/usr.png';

    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);
    
    this.UsrTypeList=[
      {Id:1,Usr:"Admin"},
      {Id:2,Usr:"Employee"},
      {Id:3,Usr:"Customer"}
    ]
  }

  LoadUsers(){
    this.log.LoadUser(1,this.usrId ).then(ret=>{
      this.usrdata=ret;
      this.usr=this.usrdata[0];
      this.usr.cPassword=this.usrdata[0].Password;
      this.usr.UsrId=this.usrdata[0].Id;
      this.image=environment.ImagePath + "Users/"+ this.usrdata[0].UsrImage;
      this.PwdDisable=true;
      
    });
  }

  SaveNewUser(){
    this.validatePassword(this.usr.Password);
    this.MobileNumValid(this.usr.MobileNo);

    if(this.usr.FName==""){
      this.toastr.warning("Please Enter First Name");
    }
    else if(this.usr.LName==""){
      this.toastr.warning("Please Enter Last Name");
    }
    else if(this.usr.Email==""){
      this.toastr.warning("Please Enter Email");
    }
    else if(this.EmailValid(this.usr.Email)==0){
      this.toastr.warning("Email Not Valid");
    }
    else if(this.IsValiMobileNo==1){
      this.toastr.warning(this.MobileNoErr);
    }
    else if(this.usr.Address==""){
      this.toastr.warning("Please Enter Address");
    }
    else if(this.usr.Password==""){
      this.toastr.warning("Please Enter Your Password");
    }
    else if(this.isvalidate==1){
      this.toastr.warning(this.passwordmeter);
    }
    else if(this.usr.cPassword==""){
      this.toastr.warning("Please Enter Confirm Password");
    }
    else if(this.usr.Password!= this.usr.cPassword){
      this.toastr.warning("Confirm Password Is Not Matched ");
    }
    else{
      if(this.BtnName=="Save") {

        if (this.UserImagData==null) {
          this.usr.UsrImage='usr.png';
        }else{
          this.usr.UsrImage=this.FileName;
        }
          console.log("save",this.usr);
          this.saveFunction();

      }else{
         this.saveFunction();
      }

    }
  
  }

  

  saveFunction(){
    this.log.SaveNewUser(this.usr).then(ret=>{
      this.retndata=ret;
     if(this.retndata.success==1){
       this.saveImageFunction();
       this.toastr.success(this.retndata.message)
       this.route.navigate(["user"]);
     }else{
       this.toastr.warning("Save Failed, Trey Again!")
     }
   });
  }

 

  Clear(){
    this.usr=new User();
    this.toastr.warning("All field Clear ");
  }


  updateImage(event:any){

    let fileToUpload = event.target.files[0];

    if(fileToUpload.type=='image/png'|| fileToUpload.type=='image/jpg'|| fileToUpload.type=='image/jpeg'){
      

      this.FileName=fileToUpload.name;
      const reader = new FileReader();
      reader.readAsDataURL(fileToUpload);
      reader.onload = () => {
       this.image = reader.result as string; 
       this.UserImagData  =this.image;
       
    }
      

    }else{
      this.toastr.warning("Can Upload JPG/JPEG and PNG Image Only");
      this.image='../../../../assets/images/icon/usr.png';
    }

  }

  rtndt:any;
  saveImageFunction(){     
    if(this.UserImagData!=null){
      this.log.ImageUpload(this.UserImagData,this.FileName,"Users/").then(ret=>{
        this.rtndt=ret;
      });
    }   
  }




  isvalidate:number=0;
  passwordmeter="";
  validatePassword(password:string){
    this.isvalidate = 0;
    const lowercaseRegex = new RegExp("(?=.*[a-z])");// has at least one lower case letter
    if (lowercaseRegex.test(password)) {
     
    } else {
      this.isvalidate = 1;
      this.passwordmeter = "Include least one lower case letter";
    }

    const uppercaseRegex = new RegExp("(?=.*[A-Z])"); //has at least one upper case letter
    if (uppercaseRegex.test(password)) {
     
    } else {
      this.isvalidate = 1;
      this.passwordmeter = "Include at least one upper case letter";
    }

    const numRegex = new RegExp("(?=.*\\d)"); // has at least one number
    if (numRegex.test(password)) {
     
    } else {
      this.isvalidate = 1;
      this.passwordmeter = "Include at least one number";
    }

    if (password.length < 5) {
      this.isvalidate = 1;
      this.passwordmeter = "Password length should at least Five";
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

  IsValiMobileNo=0;
  MobileNoErr="";
  MobileNumValid(PhoneNo:string){
    this.IsValiMobileNo=0;
    const lowercaseRegex = new RegExp("(?=.*[a-z])");
    const uppercaseRegex = new RegExp("(?=.*[A-Z])"); 
    if(lowercaseRegex.test(PhoneNo) || uppercaseRegex.test(PhoneNo)){
      this.IsValiMobileNo=1;
      this.MobileNoErr="Can not Enter Text"
  
    }
   
    if(PhoneNo.length>10 || PhoneNo.length<10){
      this.IsValiMobileNo=1;
      this.MobileNoErr="InValid Number"  
    }
  
  }




}
