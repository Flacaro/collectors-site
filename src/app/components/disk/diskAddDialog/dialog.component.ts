import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
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
    {string: 'dvd', viewValue: 'DVD'},
    {string: 'blu-ray', viewValue: 'Blu-Ray'},
    {string: 'vhs', viewValue: 'VHS'},
    {string: 'k7', viewValue: 'K7'},
    {string: 'kasetto', viewValue: 'Kasetto'},
    {string: 'laserdisc', viewValue: 'Laserdisc'},
    {string: 'mini disc', viewValue: 'Mini Disc'},
    {string: 'sacd', viewValue: 'SACD'},
    {string: 'vcd', viewValue: 'VCD'},
    {string: 'svcd', viewValue: 'SVCD'},
    {string: 'hd-dvd', viewValue: 'HD-DVD'},
    {string: 'udf', viewValue: 'UDF'},
    {string: 'dvd-audio', viewValue: 'DVD-Audio'},
    {string: 'dvd-video', viewValue: 'DVD-Video'},
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

   

  }

  onSubmit() {
    console.log(this.addDiskForm.value);
    this.dialogRef.close(this.addDiskForm.value);
    this.addDiskForm.reset();
  }

  
}
