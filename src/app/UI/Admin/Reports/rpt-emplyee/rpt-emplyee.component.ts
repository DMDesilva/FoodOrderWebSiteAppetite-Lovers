import { Component, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rpt-emplyee',
  templateUrl: './rpt-emplyee.component.html',
  styleUrls: ['./rpt-emplyee.component.scss']
})
export class RptEmplyeeComponent implements OnInit {

  _search:any;
  UsrTypeList:any;
  UsrType:any;
  imagePath=environment.ImagePath+'Users/';

  constructor(
    private log:LoginServiceService,
    private tost:ToastrService,
    private elementRef: ElementRef,
    ) { }

  ngOnInit(): void {
    this.LoadUsers();

    this.UsrTypeList=[
      {Id:0,Usr:"All"},
      {Id:1,Usr:"Admin"},
      {Id:2,Usr:"Employee"},
      {Id:3,Usr:"Customer"}
    ]

    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);




  }




  usrdata:any;
  usrdata1:any;
  LoadUsers(){
    this.log.LoadUser(0,0).then(ret=>{
      this.usrdata=ret;
      this.usrdata1=this.usrdata;
      // console.log('**',this.usrdata);
    })
  }

  filtData:any;
  UsrtypeWise(event:any){
    this.UsrType=event.target.value;

    if(this.UsrType==0){
      this.usrdata= this.usrdata1;
    }else{
      this.filtData=this.usrdata1.filter((usr:any)=>{
        return usr.UsrType==this.UsrType;
        
      });
  
      if(this.filtData==null){
        this.tost.warning("No Data");
        this.usrdata=[];
      }{
      
        this.usrdata=this.filtData;
      }
      
    }

    
   
  }



  UserTypes(usr:any){
    let usrtyp
    if(usr==1){
      usrtyp="Admin";
    }else if(usr==2){
      usrtyp="Employee";
    }
    else{
      usrtyp="Customer";
    }
    return usrtyp;
  }



}
