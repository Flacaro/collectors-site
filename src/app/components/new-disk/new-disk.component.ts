import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-disk',
  templateUrl: './new-disk.component.html',
  styleUrls: ['./new-disk.component.scss']
})
export class NewDiskComponent implements OnInit {

constructor(
  private formBuilder: FormBuilder
) { }

ngOnInit(): void {

}


onSubmit() {
  console.log('new', this.new);
}

new = this.formBuilder.group({
  title: '',
  author: '',
  label: '',
  state: '',
  format: '',
  barcode: '',
  duplicate: '',
  year: '',
  genre: '',
  band: ''
});


}
