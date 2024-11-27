import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject,BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http:HttpClient) { }



  LoadCategory(CurrDate:any){
    return this.http.post(environment.API_ENDPOINT+"RptDailyIncome.php",{CurrDate:CurrDate}).toPromise();
  }




}
