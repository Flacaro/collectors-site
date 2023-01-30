import {
  Component,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html"
})
export class DialogComponent implements OnInit {

  addDiskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addDiskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      artist: ["", [Validators.required]],
      year: [0, [Validators.required, Validators.min(1800)]],
      genre: ["", [Validators.required]],
      author: ["", [Validators.required]],
      label: [""],
      band: ["", [Validators.required]],
      state: ["", [Validators.required]],
      duplicate: [0],
      format: ["", [Validators.required]],
      barcode: [null, [Validators.min(1000000000000)]],
    
    });
  }

}
