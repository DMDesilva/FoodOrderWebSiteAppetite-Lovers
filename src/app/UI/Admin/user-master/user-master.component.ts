import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { environment } from 'src/environments/environment';
import { DeleteConfirmComponent } from '../../../DialogModal/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {

  _search ="";
  imagePath=environment.ImagePath+'Users/';

  constructor(
    private route:Router,
    private elementRef: ElementRef,
    private toastr:ToastrService,
    private log:LoginServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.LoadUsers();
    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../../../assets/admin/js/admin.js";
    this.elementRef.nativeElement.appendChild(s15);

    console.log("aaaaa",this.imagePath)
  }

  addNew(){
     this.route.navigate(["AddUser",0,0],{skipLocationChange: true});
  
  }

 addUser(fun:number,id:number){
    this.route.navigate(["AddUser",fun,id],{skipLocationChange: true});
 }

 

  usrdata:any;
  LoadUsers(){
    this.log.LoadUser(0,0).then(ret=>{
      this.usrdata=ret;
      console.log('**',this.usrdata);
    })
  }

  UserTypes(usr:any){
    let usrtyp
    if(usr==1){
      usrtyp="Admin";
    }else if(usr==2){
      usrtyp="Employee";
    }
    else{
      usrtyp="Customer";
    }
    return usrtyp;
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
        this.log.DisableItem(usrid,"users").then(ret=>{
          this.rtndta=ret;
          if(this.rtndta.success==1){
            this.LoadUsers();
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
