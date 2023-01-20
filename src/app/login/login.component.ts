import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
    constructor(
      private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
    }
   
login: Login = {
    email: '',
    password: ''
  };

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  onSubmit(): void {
    console.log('login', this.login);
    
  }

}
