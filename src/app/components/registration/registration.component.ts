import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, EMPTY } from "rxjs";
import * as moment from "moment";
import { AuthService } from "src/app/security/auth.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      surname: ["", [Validators.required, Validators.minLength(3)]],
      username: ["", [Validators.required, Validators.minLength(3)]],
      birthday: [""],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    debugger;
    const birthday = this.convertDate(this.registrationForm.value.birthday);
    this.authService
      .register({...this.registrationForm.value, birthday: birthday})
      .pipe(
        catchError((error) => {
          this.registrationForm.patchValue({ password: "" });

          if (error instanceof HttpErrorResponse) {
            if (error.status == 409) {
              this.registrationForm.setErrors({ collectorAlreadyExists: true });
            } else if(error.status == 400) {
              this.registrationForm.setErrors({ badRequest: true });
            } else {
              this.registrationForm.setErrors({ unknownError: true });
            }
          } else {
            this.registrationForm.setErrors({ unknownError: true });
          }

          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigate(["/auth/login"]);
      });
  }

  hasCollectorAlreadyExistsError(): boolean {
    return this.registrationForm.hasError("collectorAlreadyExists");
  }

  hasBadRequestError(): boolean {
    return this.registrationForm.hasError("badRequest");
  }


  hasUnknownError(): boolean {
    return this.registrationForm.hasError("unknownError");
  }


  convertDate(date: Date): string {
    return moment(date).format("YYYY-MM-DD");
  }

}
