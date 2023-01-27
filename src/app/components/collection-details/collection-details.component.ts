import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, Observable, of } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';


@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit{

  @ViewChild('dialogContent', {read: TemplateRef}) dialogTemplate!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService,
    ) {


}
    

ngOnInit(): void {
  
}
openDialog() {
  this.dialog.open(this.dialogTemplate, {
    width: '500px',
  })
}




}
