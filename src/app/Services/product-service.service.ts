import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  CakeType:any=[];
  AgeRange:any=[];

  constructor(
    private http:HttpClient
  ) { 
  
  }

  CakeTypes(){
    this.CakeType=[ {Id:0,TypeName:"All"},{Id:1,TypeName:"Normal"},{Id:2,TypeName:"BirthDay"}, {Id:3,TypeName:"Anniversary"}];
    return  this.CakeType;
  }

  AgeRanges(){
    this.AgeRange=[ {Id:1,RangeTyp:"All"}, {Id:2,RangeTyp:"Kids"}, {Id:3,RangeTyp:"Teenage"}, {Id:4,RangeTyp:"Adult"}];
    return  this.AgeRange;
  }



  LoadCategory(typ:number,Id:number){
    return this.http.post(environment.API_ENDPOINT+"LoadCategory.php",{loadType:typ,cateId:Id}).toPromise();
  }

  SaveCategory(cate:any){
    return this.http.post(environment.API_ENDPOINT+"SaveCategory.php",cate).toPromise();
  }

  LoadProducts(typ:number,Id:number){
    return this.http.post(environment.API_ENDPOINT+"LoadProducts.php",{loadType:typ,proId:Id}).toPromise();
  }

  SaveNewProduct(prod:any){
    return this.http.post(environment.API_ENDPOINT+"SaveProduct.php",prod).toPromise();
  }

  LoadCategWiseFood(id:number){
    return this.http.post(environment.API_ENDPOINT+"LoadCategWiseFood.php",{CateId:id}).toPromise();
  }

  public countProd=0;
  public ProdCount=new BehaviorSubject<number>(this.countProd);

  public CatId=0;
  public ProdCategory=new BehaviorSubject<number>(this.CatId);

  SaveOrder(prod:any){
    return this.http.post(environment.API_ENDPOINT+"SaveOrder.php",prod).toPromise();
  }

  LoadMaterial(){
    return this.http.get(environment.API_ENDPOINT+"LoadMaterial.php");
  }


  LoadOrders(typ:number){
    return this.http.post(environment.API_ENDPOINT+"LoadOrders.php",{typ:typ}).toPromise();
  }


  OrderConfirm(orditm:any){
    return this.http.post(environment.API_ENDPOINT+"OrderConfirm.php",orditm).toPromise();
  }

  LoadOrderItmDetails(orid:number){
    return this.http.post(environment.API_ENDPOINT+"LoadOrderItmDetails.php",{orid:orid}).toPromise();
  }



}
