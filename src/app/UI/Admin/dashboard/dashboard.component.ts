import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MessageViewComponent } from 'src/app/DialogModal/message-view/message-view.component';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { MsgServiceService } from 'src/app/Services/msg-service.service';
import { ReportServiceService } from 'src/app/Services/report-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  EmpMsgData:any=[];
  UsrId:any;
  image =environment.ImagePath+'Users/';
      

  constructor(
    private elementRef: ElementRef,
    private msg:MsgServiceService,
    private dialog: MatDialog,
    private toastr:ToastrService,
    private log:LoginServiceService,
    private Rpt: ReportServiceService,
    public datepipe: DatePipe,
  ) {
    this.UsrId=localStorage.getItem('userID');

   }

  countData:any;
  Admin=0;
  Employee=0;
  Customer=0;
  ProdCategory=0;
  Product=0;
  Order=0;
  Supplier=0;
  NewOrder=0;
  TodayOrderCount=0;


  TotIncome:number=0;
  CalIncome=0;
  NewDate=new Date();
  today:any;



  ngOnInit(): void {
    this.loadMsg();
    this.SelectDate();

    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);

    this.log.DashboardCount().subscribe(ret=>{
      this.countData=ret;
      this.Admin=this.countData.Admin;
      this.Employee=this.countData.Employee;
      this.Customer=this.countData.Customer;
      this.ProdCategory=this.countData.ProdCategory;
      this.Product=this.countData.Product;
      this.Order=this.countData.Order;
      this.Supplier=this.countData.Supplier;
      this.NewOrder=this.countData.NewOrder;
      this.TodayOrderCount=this.countData.TodayOrderCount;
      console.log("aaa",this.countData)
    });

    this.today=this.datepipe.transform(this.NewDate,'MM/dd/yyyy');
  
  }
  
 
  loadMsg(){  
    this.msg.LoadMsg(this.UsrId,2,0).then(ret=>{
      this.EmpMsgData=ret; 
    },error=>{
      this.toastr.warning("No Messages");
    })
  }

  dialogValue=0;
  rtndta:any;
  openDialog(msg:any){
    const dialogRef = this.dialog.open(MessageViewComponent, {   
      disableClose:true,
      // height:'70%',
       width:'50%',
      data: { pageValue: msg }  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      this.dialogValue = result.data;
      if(this.dialogValue==1){
       this.msg.UpdateMsg(msg.Id).then(ret=>{
        this.rtndta=ret;
        if(this.rtndta.success==1){
          this.toastr.success("Massage Read Success");
        }
       });
      }else{
        
      }
    });
  }

  RptData:any;
 
  
  SelectDate(){
    this.Rpt.LoadCategory(this.NewDate).then(ret=>{
      this.RptData=ret;
     
      for (let i = 0; i <  this.RptData.length; i++) {
        this.CalIncome=+this.RptData[i].Income;
       
      }
      this.TotIncome=this.CalIncome;

    },error=>{
      this.toastr.warning("No Data");
      this.TotIncome=0;
    })
   
  }

}

