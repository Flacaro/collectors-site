import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.scss']
})
export class NewCollectionComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('newCollection', this.newCollection);
  }

  newCollection = this.formBuilder.group({
    name: '',
    type: ''
  });

  toppings = new FormControl();

  toppingList = ['Yes', 'No'];
  selectedToppings: any;

}


