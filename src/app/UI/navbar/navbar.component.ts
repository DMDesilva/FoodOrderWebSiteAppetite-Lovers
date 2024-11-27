import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  visible:boolean = true;
  IshideLogin:boolean = false;
  IshideLogOut:boolean = true;
  token:any;

  public userName:any;
  public userType:any;
  public usrInf:any;

  data:any=[];
  catedata:any=[];
  LoginUsrName="";
  LoginUsrIdx="";
  usrTyp:any

  image="";
  ProdCount:any;
  usrId:any;
  rtnData:any;

  constructor(
    public router:Router,
    private log:LoginServiceService,
    private prod:ProductServiceService,
    private elementRef: ElementRef,
    private toastr:ToastrService,

  ) { 
    this.usrTyp=localStorage.getItem("usertyp");
    this.usrId=localStorage.getItem("userID");
    this.token=localStorage.getItem("auth-token");
    
    this.prod.ProdCount.subscribe(ret=>{
      this.ProdCount=ret;
    });
  }

  ngOnInit(): void {
    this.LoadCategory();

    this.log.LoadCurrntUsr(this.usrId).then(ret=>{
      this.rtnData=ret;
  
      this.image=  environment.ImagePath+'Users/'+this.rtnData[0].UsrImage;
      this.LoginUsrName=this.rtnData[0].FName;
  
      this.log.UsrsInfoData(this.LoginUsrName,this.image);
    },error=>{
     // this.toastr.warning("No Data");
    })

    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../../assets/admin/js/functions.js";
    this.elementRef.nativeElement.appendChild(s14);

    if( this.token!=null ){
      this.IshideLogin=false;
      this.IshideLogOut=true;

    }else{
      this.IshideLogin=true;
      this.IshideLogOut=false;


    }

  }

  register(){
    this.router.navigate(["register",0,0]);
   }

   ChangeMyProfile(){
    this.router.navigate(["register",1, this.usrId]);
  }

  Logout(){
    this.log.LogOut();
    this.router.navigate(['login']);
    this.prod.ProdCount.next(0);
  
  }


  LoadCategory(){
    this.prod.LoadCategory(0,0).then(ret=>{
      this.catedata=ret;
    });
  }

  LoadProductListPage(id:number){
    // this.router.navigate(["productList",id],{skipLocationChange: true});
    this.router.navigate(["productList"]);
    this.prod.ProdCategory.next(id);
  }




}
