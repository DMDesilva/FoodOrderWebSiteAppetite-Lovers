import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmComponent } from 'src/app/DialogModal/delete-confirm/delete-confirm.component';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  _search ="";
  imagePath=environment.ImagePath+'Products/';

  constructor(
    private route:Router,
    private elementRef: ElementRef,
    private toastr:ToastrService,
    private pro:ProductServiceService,
    private log:LoginServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.LoadCategory();
    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);

  }

 

  addNew(fun:number,id:number){
    this.route.navigate(["AddProduct",fun,id],{skipLocationChange: true});
  }

 

  ProData:any;
  LoadCategory(){
    this.pro.LoadProducts(0,0).then(ret=>{
      this.ProData=ret;
      console.log('**',this.ProData);
    },error=>{
      this.toastr.success("No Data");
    });
  }

  

  rtndta:any;
  dialogValue:any;
  openDialog(usrid:number): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      
      disableClose:true,
      // backdropClass: 'custom-dialog-backdrop-class',
      // panelClass: 'custom-dialog-panel-class',
      //data: { pageValue: this.sendValue }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      this.dialogValue = result.data;
      if(this.dialogValue==1){
        this.log.DisableItem(usrid,"product").then(ret=>{
          this.rtndta=ret;
          if(this.rtndta.success==1){
            this.LoadCategory();
            this.toastr.success(this.rtndta.message);
          
          }else{
            this.toastr.warning("Diable Failed");
          }
        })
      }else{
        this.toastr.warning("Diable Cansel");
      }
    });
  }


}
