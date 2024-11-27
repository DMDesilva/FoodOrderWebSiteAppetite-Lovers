import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject,BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MsgServiceService {

  constructor(private http:HttpClient) { }


  SaveMsg(msg:any){
    return this.http.post(environment.API_ENDPOINT+"SaveMsg.php",msg).toPromise();

  }

  LoadMsg(usrid:number,typ:number,id:number){
    return this.http.post(environment.API_ENDPOINT+"LoadMsg.php",{UsrId:usrid,Typ:typ,Id:id}).toPromise();

  }

  UpdateMsg(id:number){
    return this.http.post(environment.API_ENDPOINT+"UpdateMsg.php",{Id:id}).toPromise();
  }

}
