import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  token:any;
  constructor(private _route:Router,public datepipe: DatePipe){ }
  canActivate():boolean{
    var ccDate =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
   this.token=localStorage.getItem('userInfo');
   var aar =JSON.parse(this.token)
   
   // console.log(this.token,aar);
 if (aar==null || aar.success==0) {
      
       this._route.navigateByUrl('/login');

       return false;
     }else{
      console.log(aar.log_date,ccDate);
      // if (aar.log_date!==ccDate) 
      // {
      //   this._route.navigateByUrl('/login');
      //   localStorage.removeItem("userInfo");
      // } else {
      //   this._route.navigateByUrl('/dashboard');
      // }
        return true;
     }
  }
  
}
