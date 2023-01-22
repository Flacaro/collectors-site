import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Registration } from 'src/app/models/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }


registrationForm = this.formBuilder.group({
  name: '',
  surname: '',
  username: '',
  birthday: '',
  email: '',
  password: '',
});


onSubmit(): void {
    console.log('registrationForm', this.registrationForm.value);
    
  }


}
