import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
  ) { }

  ngOnInit(): void {
  }

  DisableYes(typ:number) {
    if(typ==1){
      this.dialogRef.close({ event: 'close', data: 1 });
    }
    else{
      this.dialogRef.close({ event: 'close', data: 2 });
    }
   
  }

}
