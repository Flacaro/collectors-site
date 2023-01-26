import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

import { Registration } from 'src/app/models/registration';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router : Router


  ) { }

  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      birthday: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    debugger;
    this.authService.register(this.registrationForm.value)
    .pipe(
      catchError((error) => {
        this.registrationForm.patchValue({password: ""});

        if (error instanceof HttpErrorResponse) {
          if (error.status >= 400 && error.status < 500) {
            this.registrationForm.setErrors({ invalidCredentials: true });
          }
        } else {
          this.registrationForm.setErrors({ unknownError: true });
        }
        
        return EMPTY;
      })
    )
    .subscribe(() => {
      this.router.navigate(['/login']);
    }
    );
  }

  hasInvalidCredentialsError(): boolean {
    return this.registrationForm.hasError("invalidCredentials");
  }

  hasUnknownError(): boolean {
    return this.registrationForm.hasError("unknownError");
  }

  
  }





