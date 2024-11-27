import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmComponent } from 'src/app/DialogModal/delete-confirm/delete-confirm.component';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.scss']
})
export class SupplierMasterComponent implements OnInit {

  _search ="";
 
  constructor(
    private route:Router,
    private elementRef: ElementRef,
    private toastr:ToastrService,
    private log:LoginServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.LoadSupplier();
    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);

    
  }

 

  addSupplier(fun:number,id:number){
    this.route.navigate(["addsupplier",fun,id],{skipLocationChange: true});
 }

 

  usrdata:any;
  LoadSupplier(){
    this.log.LoadSupplier(0,0).then(ret=>{
      this.usrdata=ret;
      console.log('**',this.usrdata);
    })
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
        this.log.DisableItem(usrid,"supplier").then(ret=>{
          this.rtndta=ret;
          if(this.rtndta.success==1){
            this.LoadSupplier();
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
