import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { UsrNameImage } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http:HttpClient
  ) { }


  public usr:UsrNameImage =new UsrNameImage();
  public usrData=new BehaviorSubject<UsrNameImage>(this.usr);
  _usrData$=this.usrData.asObservable();

  UsrsInfoData(usrName:string,usrImg:any){
    this.usr.FName=usrName;
    this.usr.UsrImage=usrImg;
    this.usrData.next(this.usr);
  }

  
  login(user: string, pass: string) {

    console.log(user ," " ,pass)
    return this.http.post(environment.API_ENDPOINT + 'Login.php', { email: user, password: pass }).toPromise();
  }
  

  LogOut(){
    localStorage.removeItem("userInfo");
    localStorage.removeItem('auth-token');
    localStorage.removeItem('userID'); 
    localStorage.removeItem('usertyp');
    
  }


  SaveNewUser(usr:any){
    return this.http.post(environment.API_ENDPOINT+"SaveUser.php",usr).toPromise();
  }

  LoadUser(typ:number,UserId:number){
    return this.http.post(environment.API_ENDPOINT+"LoadUsers.php",{loadType:typ,UsrId:UserId}).toPromise();
  }

  ImageUpload(Img:any,ImgName:string,FolderPath:string){
   
    return this.http.post(environment.API_ENDPOINT+"ImageUpload.php",{ImgeData:Img,ImgeName:ImgName,ImgLoction:FolderPath}).toPromise();
  }

  DisableItem(usrId:number,tblName:string){
    return this.http.post(environment.API_ENDPOINT+"DisableItem.php",{UserId:usrId,tableName:tblName}).toPromise();
  }

  ChangePassword(usr:any,nwPsswd:string){
    return this.http.post(environment.API_ENDPOINT+'ChangePassword.php',{UsrId:usr,Pwd:nwPsswd}).toPromise();
  }

  LoadCurrntUsr(usr:any){
    return this.http.post(environment.API_ENDPOINT+'LoadCurrntUsr.php',{UsrId:usr}).toPromise();
  }


  // *****  Supplier Master
  LoadSupplier(typ:number,UserId:number){
    return this.http.post(environment.API_ENDPOINT+"LoadSupplier.php",{loadType:typ,UsrId:UserId}).toPromise();
  }

  SaveSupplier(usr:any){
    return this.http.post(environment.API_ENDPOINT+"SaveSupplier.php",usr).toPromise();
  }

  DashboardCount(){
    return this.http.get(environment.API_ENDPOINT+"DashboardCount.php");
  }

}
