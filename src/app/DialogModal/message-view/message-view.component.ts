import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {

  msg:any;
  image:any;

  constructor(
    public dialogRef: MatDialogRef<MessageViewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
   
  ) { 
    this.msg = data.pageValue;
    this.image =environment.ImagePath+'Users/'+this.msg.UsrImage;
  }

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
