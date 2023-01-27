import { Component, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('dialogContent', {read: TemplateRef}) dialogTemplate!: TemplateRef<any>;

  addDiskForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.addDiskForm = this.formBuilder.group({
        title: ["", [Validators.required]],
        artist: ["", [Validators.required]],
        year: ["", [Validators.required]],
        genre: ["", [Validators.required]],
        author: ["", [Validators.required]],
        label: [""],
        band: ["", [Validators.required]],
        state: ["", [Validators.required]],
        duplicate: [""],
        format: ["", [Validators.required]],
        barcode: [""],
        collection: ["", [Validators.required]],
        tracks : [""]
  });
  }

  openDialog() {
    this.dialog.open(this.dialogTemplate,{height:'50px',width:'50px'})
  }

  onSubmit() {

  }

  

 

}

