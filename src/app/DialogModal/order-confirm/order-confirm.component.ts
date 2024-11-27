import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmComponent>,
  ) { }

  ngOnInit(): void {
  }


  Yes(id:number){
    if(id==1){
      this.dialogRef.close({ event: 'close', data: 1 });
    }
    else{
      this.dialogRef.close({ event: 'close', data: 2 });
    }
  }



}
