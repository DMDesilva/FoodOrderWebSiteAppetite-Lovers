import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  usrid :any;
  usrdata :any;
  rtnData :any;
  usrimage="";
  usrname="";

  constructor(
    private router:Router,
    private log:LoginServiceService
  ) { 
    this.usrid=localStorage.getItem("userID");
  }

  ngOnInit(): void {
    this.usrid=localStorage.getItem("userID");
    
    if((this.usrimage===null &&  this.usrname===null)||(this.usrimage===undefined &&  this.usrname===undefined)){
      this.log.LoadCurrntUsr(this.usrid).then(ret=>{
        this.rtnData=ret; 
        console.log(this.rtnData,"111")
        this.usrimage=  environment.ImagePath+'Users/'+this.rtnData[0].UsrImage;
        this.usrname=this.rtnData[0].FName;       
      },error=>{});
      
    }else{
      this.log._usrData$.subscribe(ret=>{
        this.usrdata=ret;
        this.usrimage=this.usrdata.UsrImage;
        this.usrname=this.usrdata.FName;
       
      });
    }
    
  }

  
  ViewAdminProfile(){
    this.router.navigate(["register",1,this.usrid]);
  }
  
  changePasswrd(){
     this.router.navigate(["ChangePassword"]);
  }
  
  Logout(){
    this.log.LogOut();
    this.router.navigate(['login']);
  }

  

}
