import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmComponent } from 'src/app/DialogModal/delete-confirm/delete-confirm.component';
import { EmployeeMsg } from 'src/app/Models/EmployeeMsg';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { MsgServiceService } from 'src/app/Services/msg-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  AgeRange:any=[];
  EmpMsg:any=[];
  Isdisabled=false;
  BtnName="Save";
  EmpMsgData:any=[];
  UsrId:any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private msg:MsgServiceService,
    private log:LoginServiceService,
    private route:Router,
    private elementRef: ElementRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    
    this.UsrId=localStorage.getItem('userID');
    this.getnew();
  
    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../../assets/admin/js/functions.js";
    this.elementRef.nativeElement.appendChild(s14);

   
  }


  getnew(){
    this.EmpMsg=new EmployeeMsg();
    this.loadMsg();
  }

  Clear(){
    this.EmpMsg=new EmployeeMsg();
    this.toastr.show("Message Clear Success");
  }

  SaveMsg(){
    if(this.EmpMsg.MsgHeader==""){
      this.toastr.warning("Please Enter Message Subject");
    }else if(this.EmpMsg.MsgBody==""){
      this.toastr.warning("Please Enter Message Body");
    }else{
      if(this.BtnName=="Save"){
        this.saveFunc();
      }else{
        this.saveFunc();
      }
    }
  }


  loadMsg(){
    this.EmpMsg.UsrId=this.UsrId;
    this.msg.LoadMsg(this.EmpMsg.UsrId,0,0).then(ret=>{
      this.EmpMsgData=ret;
    },error=>{
      this.toastr.warning("No Messages");
    })
  }

  LoadMsgForUpdate(data:any){
    this.BtnName="Update";
    this.EmpMsg=data;
   
  }

  rtn:any;
  saveFunc(){
    // console.log(this.EmpMsg);
    this.msg.SaveMsg(this.EmpMsg).then(ret=>{
      this.rtn=ret;
      if(this.rtn.success==1){
        this.toastr.success(this.rtn.message); 
        this.getnew();     
      }else{
        this.toastr.warning(this.rtn.message);
      }
    })
  }



  rtndta:any;
  dialogValue:any;
  openDialog(id:number): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {   
      disableClose:true,   
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      this.dialogValue = result.data;
      if(this.dialogValue==1){
        this.log.DisableItem(id,"notification").then(ret=>{
          this.rtndta=ret;
          if(this.rtndta.success==1){
            this.getnew(); 
            this.toastr.success("Delete Successed");
          
          }else{
            this.toastr.warning("Delete Failed");
          }
        })
      }else{
        this.toastr.warning("Delete Cansel");
      }
    });
  }


}
