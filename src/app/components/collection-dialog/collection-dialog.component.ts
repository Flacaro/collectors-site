import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../diskAddDialog/dialog.component';
import {Select} from "../../models/select";

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent {

  collectionFormData!: FormGroup;

  genre: Select[] = [
    {string: 'rock', viewValue: 'Rock'},
    {string: 'pop', viewValue: 'Pop'},
    {string: 'jazz', viewValue: 'Jazz'},
    {string: 'blues', viewValue: 'Blues'},
    {string: 'metal', viewValue: 'Metal'},
    {string: 'punk rock', viewValue: 'Punk Rock'},
    {string: 'hip-hop', viewValue: 'Hip-Hop'},
    {string: 'reggae', viewValue: 'Reggae'},
    {string: 'country', viewValue: 'Country'},
    {string: 'classica', viewValue: 'Classica'},
    {string: 'soul', viewValue: 'Soul'},
    {string: 'disco', viewValue: 'Disco'},
    {string: 'funk', viewValue: 'Funk'},
    {string: 'indie', viewValue: 'Indie'},
    {string: 'electronic', viewValue: 'Electronic'},
    {string: 'alternative', viewValue: 'Alternative'},
    {string: 'folk', viewValue: 'Folk'},
    {string: 'rap', viewValue: 'Rap'},
    {string: 'ska', viewValue: 'Ska'},
    {string: 'new wave', viewValue: 'New Wave'},
    {string: 'hard rock', viewValue: 'Hard Rock'},
    {string: 'heavy metal', viewValue: 'Heavy Metal'},
    {string: 'progressive rock', viewValue: 'Progressive Rock'},
    {string: 'psychedelic rock', viewValue: 'Psychedelic Rock'},
  ];
  
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
