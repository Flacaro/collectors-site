import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../disk/diskAddDialog/dialog.component';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent {

  collectionFormData!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogComponent>
    
  ) { }

  ngOnInit(): void {
    this.collectionFormData = this.formBuilder.group({
      name: ["", [Validators.required]],
      type: ["", [Validators.required]],
      visible: [false, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.collectionFormData.value);
    this.dialogRef.close(this.collectionFormData.value);
    this.collectionFormData.reset();
  }


}
