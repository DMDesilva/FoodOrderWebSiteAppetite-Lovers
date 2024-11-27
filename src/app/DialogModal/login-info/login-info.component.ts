import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss']
})
export class LoginInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginInfoComponent>,
  ) { }

  ngOnInit(): void {
  }


  LoginOk(typ:number) {
    if(typ==1){
      this.dialogRef.close({ event: 'close', data: 1 });
    }
    else{
      this.dialogRef.close({ event: 'close', data: 2 });
    }
   
  }


}
