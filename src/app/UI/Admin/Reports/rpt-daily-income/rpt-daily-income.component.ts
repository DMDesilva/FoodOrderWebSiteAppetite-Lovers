import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportServiceService } from 'src/app/Services/report-service.service';

@Component({
  selector: 'app-rpt-daily-income',
  templateUrl: './rpt-daily-income.component.html',
  styleUrls: ['./rpt-daily-income.component.scss']
})
export class RptDailyIncomeComponent implements OnInit {


  CurrentDate :any; 
  rptDate:any;
  TotIncome:number=0;
  CalIncome=0;

  constructor(
    private elementRef: ElementRef,
    public datepipe: DatePipe,
    private Rpt: ReportServiceService,
    private toster:ToastrService,
  ) { }

  ngOnInit(): void {
    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);

    this.CurrentDate= new Date();
    this.rptDate=this.datepipe.transform(this.CurrentDate,'MM/dd/yyyy');
  
    this.SelectDate();
  }

  RptData:any;
  SelectDate(){
    this.Rpt.LoadCategory(this.CurrentDate).then(ret=>{
      this.RptData=ret;

      for (let i = 0; i <  this.RptData.length; i++) {
        this.CalIncome=+this.RptData[i].Income;
       
      }
      this.TotIncome=this.CalIncome;

    },error=>{
      this.toster.success("No Data");
      this.TotIncome=0;
    })
   
  }





}
