import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  OldPassword="";
  getOldPassword="";
  NewPassword="";
  cNewPassword="";
  usrId:any;
  rtnData:any;
  usr:any;

  constructor(
    public router:Router,
    private log:LoginServiceService,
    private prod:ProductServiceService,
    private elementRef: ElementRef,
    private tost: ToastrService,
  ) { 

    this.usrId=localStorage.getItem('userID');
    
  }

  ngOnInit(): void {

    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../../assets/admin/js/functions.js";
    this.elementRef.nativeElement.appendChild(s14);
 

    this.log.LoadCurrntUsr(this.usrId).then(ret=>{
      this.rtnData=ret;
      this.getOldPassword= this.rtnData[0].Password;
     
    })
  }


rtnVal:any

  ChangePassword(){
    if( this.OldPassword==""){
      this.tost.warning("Please Enter Your Previous Password");
    }
    else if(this.NewPassword==""){
      this.tost.warning("Please Enter Your New Password");
    }
    else if( this.OldPassword!=this.getOldPassword){
      this.tost.warning("Your Previous Password Not Match");
    }
    
    else if(this.cNewPassword==""){
      this.tost.warning("Please Enter Confirm Password");
    } 
    else if( this.cNewPassword!=this.NewPassword){
      this.tost.warning("Confirm Password Is Not Matched");
    }
    else{
      this.validatePassword(this.cNewPassword)
      if(this.isvalidate==1){
        this.tost.warning(this.passwordmeter);
      }else{
       
        this.log.ChangePassword(this.usrId,this.cNewPassword).then(ret=>{
          this.rtnVal=ret;
         
          if(this.rtnVal.success==1){
            this.tost.success(this.rtnVal.message);
            this.router.navigate(["home"]);
          }else{
            this.tost.warning("Password Change Failed...! Try Agian")
          }
        });
      }
    }

  }


  
  invalidPassword: any = "";
  passwordmeter: string = "";
  isvalidate: number = 0;

  validatePassword(password: string) {
    let hasLower = false;
    let hasUpper = false;
    let hasNum = false;
    let hasSpecial = false;
    this.passwordmeter = "";
    this.isvalidate = 0;
    const lowercaseRegex = new RegExp("(?=.*[a-z])");// has at least one lower case letter
    if (lowercaseRegex.test(password)) {
      hasLower = true;
    } else {
      this.isvalidate = 1;
      this.passwordmeter = "Include least one lower case letter";
    }

    const uppercaseRegex = new RegExp("(?=.*[A-Z])"); //has at least one upper case letter
    if (uppercaseRegex.test(password)) {
      hasUpper = true;
    } else {
      this.isvalidate = 1;
      this.passwordmeter = "Include at least one upper case letter";
    }

    const numRegex = new RegExp("(?=.*\\d)"); // has at least one number
    if (numRegex.test(password)) {
      hasNum = true;
    } else {
      this.isvalidate = 1;
      this.passwordmeter = "Include at least one number";
    }

    if (password.length < 5) {
      this.isvalidate = 1;
      this.passwordmeter = "Password length should at least Five";
    }

  }






}
