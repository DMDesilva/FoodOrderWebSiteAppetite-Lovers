import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/Models/Login';
import { LoginServiceService } from 'src/app/Services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Usr:any;
  ReturnData:any;
  UserDetails:any;
  token:any;
  retval:any;
  userName:string="";
  userType:number=0;

  constructor(
    public router:Router,
    private toastr: ToastrService,
    private logser:LoginServiceService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.GetNew();
    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../../assets/admin/js/functions.js";
    this.elementRef.nativeElement.appendChild(s14);
  }

  
  GetNew(){
    this.Usr=new Login();
  }


  Login(){
    
 
    if(this.Usr.UserEmai==""){
      this.toastr.warning("Email can`t Empty");
    }else if(this.Usr.UserPassword==""){
      this.toastr.warning("Email can`t Password");
    }else{
    
      this.logser.login(this.Usr.UserEmail,this.Usr.UserPassword).then(ret=>{
        this.retval=ret;  
        console.log(this.retval);
      
        if(this.retval.success==0){
  
           this.toastr.warning(this.retval.message);
        }
        else{     
          localStorage.setItem('userInfo',JSON.stringify(this.retval));
          localStorage.setItem('usertyp',JSON.stringify(Number(this.retval.typ)));
          localStorage.setItem('userID',JSON.stringify(Number(this.retval.ID)));
          localStorage.setItem('auth-token',JSON.stringify(this.retval.token));
         // localStorage.setItem('SavedUsrId',JSON.stringify(this.retval.USRID));
          
            // if(this.retval.typ==1){
            //   this.router.navigate(['/Dashboard']) ;
            // }else if(this.retval.typ==3){
            //   this.router.navigate(['/']) ;
            // }else{
              
            //   this.router.navigate(['/StudentLink']) ;
            // }
        
            this.router.navigate(['/home']) ;
        } 
        
        });
      }
  
  }


  register(){
    this.router.navigate(["register",0,0]);
  }



}
