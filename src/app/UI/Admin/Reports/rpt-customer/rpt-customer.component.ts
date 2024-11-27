import { Component, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rpt-customer',
  templateUrl: './rpt-customer.component.html',
  styleUrls: ['./rpt-customer.component.scss']
})
export class RptCustomerComponent implements OnInit {

  _search:any;
  IsActive:any;
  Satatus:any;
  imagePath=environment.ImagePath+'Users/';

  constructor(
    private log:LoginServiceService,
    private tost:ToastrService,
    private elementRef: ElementRef,
    ) { }

  ngOnInit(): void {
    this.LoadUsers();

    this.IsActive=[
      {Id:1,Stat:"Active"},
      {Id:0,Stat:"In-Active"},
     
    ]

    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);




  }




  usrdata:any;
  CustData:any;

  LoadUsers(){
    this.log.LoadUser(0,0).then(ret=>{
      this.usrdata=ret; 
      this.CustData=this.usrdata.filter((usr:any)=>{
        return usr.UsrType==3;      
      });
      this.usrdata= this.CustData;
    });

  }


  FilteredData:any;
  UsrtypeWise(event:any){
    this.Satatus=event.target.value;
   
    this.FilteredData=this.usrdata.filter((usr:any)=>{
      return usr.IsActive== this.Satatus;      
    });

    if(this.FilteredData.length==0){
      this.CustData=[];
      this.tost.warning("No Data");
      
    }else{
      this.CustData=this.FilteredData; 
    
    }


  }
  

}
