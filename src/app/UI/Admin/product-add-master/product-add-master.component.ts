import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/Product';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-add-master',
  templateUrl: './product-add-master.component.html',
  styleUrls: ['./product-add-master.component.scss']
})
export class ProductAddMasterComponent implements OnInit {

 
  proId:any; 
  operation="";
  FileName="";
  BtnName="Save";
  image:any;

  Isdisabled=false;
  IsTypeCake:boolean=false;
 
  pro:any;
  ProImagData:any;

  retndata:any;
  prodata:any;
  catedata:any
  CakeType:any=[];
  AgeRange:any=[];

  constructor(
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private prod:ProductServiceService,
    private log:LoginServiceService,
    private route:Router,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc:any,
  ) { }

  ngOnInit(): void {
    this.getNew();
    
    var operationType = this.activatedRoute.snapshot.paramMap.get('fun');
    this.proId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (Number(operationType) == 0) {
      this.BtnName="Save";
      this.operation = "Create";
      this.IsTypeCake=true;
     
    } else if (Number(operationType) == 1) {
      this.operation = "Edit";
      this.LoadProdcuts();
      this.BtnName="Update"; 
    
    } else {
      this.operation = "View";
      this.LoadProdcuts();
      this.Isdisabled=true;     
      this.BtnName="Save";
    }
  }

  ActivrStatus(){
    if(this.pro.IsActive==true){
      this.pro.IsActive=1;
    }else{
      this.pro.IsActive=0;
    }
  }

  getNew(){
    this.pro=new Product();

    this.CakeType=[ {Id:1,TypeName:"Normal"},{Id:2,TypeName:"BirthDay"}, {Id:3,TypeName:"Anniversary"}];
    this.AgeRange=[ {Id:1,RangeTyp:"All"}, {Id:2,RangeTyp:"Kids"}, {Id:3,RangeTyp:"Teenage"}, {Id:4,RangeTyp:"Adult"}];

    this.LoadCategory();
    this.image='../../../../assets/images/icon/food.jpg';

    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);
   
  }

  LoadCategory(){
    this.prod.LoadCategory(0,0).then(ret=>{
      this.catedata=ret;
      console.log('**',this.catedata);
    });
  }


  LoadProdcuts(){
    this.prod.LoadProducts(1,this.proId ).then(ret=>{
      this.prodata=ret;
      this.pro=this.prodata[0];
      this.pro.ProName=this.prodata[0].ProName;
      this.image=environment.ImagePath + "Products/"+ this.prodata[0].ProImage;
      console.log(this.pro)
    });
  }

  //cketyp=0;
  selectProdType(event:any) {
    console.log(event.target.value)
    if(event.target.value==4){
      this.IsTypeCake=false;
      //this.cketyp=1;
    }else{
      this.IsTypeCake=true;
    }
    
  }



  SaveProduct(){
    
    if(this.pro.CateId==0){
      this.toastr.warning("Please Select Product Category");
    }

    else if(this.pro.CateId==4 && this.pro.CakeTypId==0){
      this.toastr.warning("Please Select Cake Type");
    }
     else if(this.pro.CateId==4 && this.pro.CakeAgeRange==0){
      this.toastr.warning("Please Select Age");
    }
    else if(this.pro.ProName==""){
      this.toastr.warning("Please Enter Product Name");
    }
    else if(this.pro.ProDetails==""){
      this.toastr.warning("Please Enter Product Details");
    }
    // else if(this.pro.Qty==0){
    //   this.toastr.warning("Please Enter Product Qty");
    // }
    // else if(this.pro.ReQty==0){
    //   this.toastr.warning("Please Enter Product Reorder Qty");
    // }
    else if(this.pro.CostPrice==0){
      this.toastr.warning("Please Enter Product Cost price");
    }
    else if(this.pro.SellPrice==0){
      this.toastr.warning("Please Enter Product Sell Price");
    }
  
    else if(this.pro.ProImage==""){
      this.toastr.warning("Please Add Product Image");
    }
   
    else{
      if(this.BtnName=="Save") {

        if (this.ProImagData==null) {
          this.toastr.warning("Please Add Product Image11");
        }else{
          this.pro.ProImage=this.FileName;
          console.log("save",this.pro);
          this.saveFunction();
        }
         

      }else{
         this.saveFunction();
      }

    }
  
  }

  

  saveFunction(){
    this.prod.SaveNewProduct(this.pro).then(ret=>{
      this.retndata=ret;
      
      if(this.retndata.success==1){
        this.saveImageFunction();
        this.toastr.success(this.retndata.message)
        this.route.navigate(["product"]);
      }else{
        this.toastr.warning("Save Failed, Trey Again!")
      }
   });
  }

 

  Clear(){
    this.pro=new Product();
    this.toastr.success("All Fields Clear Success");
  }


  updateImage(event:any){

    let fileToUpload = event.target.files[0];

    if(fileToUpload.type=='image/png'|| fileToUpload.type=='image/jpg'|| fileToUpload.type=='image/jpeg'){
      
      this.FileName=fileToUpload.name;
      this.pro.ProImage=this.FileName;
      const reader = new FileReader();
      reader.readAsDataURL(fileToUpload);
      reader.onload = () => {
       this.image = reader.result as string; 
       this.ProImagData  =this.image;
       
    }
      

    }else{
      this.toastr.warning("Can Upload JPG/JPEG and PNG Image Only");
      this.image='../../../../assets/images/icon/food.jpg';
    }

  }

  rtndt:any;
  saveImageFunction(){    
     if(this.ProImagData!=null){
      this.log.ImageUpload(this.ProImagData,this.FileName,"Products/").then(ret=>{
        this.rtndt=ret;
      });
     }
 
  }








}
