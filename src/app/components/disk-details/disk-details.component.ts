import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-disk-details',
  templateUrl: './disk-details.component.html',
  styleUrls: ['./disk-details.component.scss']
})
export class DiskDetailsComponent implements OnInit {

  constructor (
    // public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

}

