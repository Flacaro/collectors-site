import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { Select } from "src/app/models/select";


@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
})
export class DialogComponent implements OnInit {
  addDiskForm!: FormGroup;
  collectionId!: number;


  selectValues: Select[] = [
    {string: 'buono', viewValue: 'Buono'},
    {string: 'ottimo', viewValue: 'Ottimo'},
    {string: 'discreto', viewValue: 'Discreto'},
  ];


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
  

  format: Select[] = [
    {string: 'vinile', viewValue: 'Vinile'},
    {string: 'cd', viewValue: 'CD'},
    {string: 'cassette', viewValue: 'Cassette'},
    {string: 'dvd', viewValue: 'DVD'}
  ];



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {

    this.addDiskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      artist: ["", [Validators.required]],
      year: [0, [Validators.required, Validators.min(1800)]],
      genre: ["", [Validators.required]],
      author: ["", [Validators.required]],
      label: ["", [Validators.required]],
      band: ["", [Validators.required]],
      state: ["", [Validators.required]],
      duplicate: [0],
      format: ["", [Validators.required]],
      barcode: [null, [Validators.min(1000000000000)]],
    });

    this.route.params.subscribe((params) => {
      this.collectionId = params["collectioId"];
    });

    // const year = this.convertDate(this.addDiskForm.value.year);
   

  }

  onSubmit() {
    console.log(this.addDiskForm.value);
    this.dialogRef.close(this.addDiskForm.value);
    this.addDiskForm.reset();
  }


  convertDate(date: Date) {
    return moment(date).format("YYYY-MM-DD");
  }
  
}
