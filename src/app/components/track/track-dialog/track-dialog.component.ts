import {Component, ElementRef, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dialog",
  templateUrl: "./track-dialog.component.html"

})

export class TrackDialogComponent implements OnInit {

  addTrackForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.addTrackForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      author: ["", [Validators.required]],
      album: ["", [Validators.required]],
      band: ["", [Validators.required]],
      artist: ["", [Validators.required]],
      time:[0]
    });
  }

}
