import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, EMPTY, switchMap, tap } from "rxjs";
import { CONSTANTS } from "src/app/constants";
import { AuthService } from "src/app/security/auth.service";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private loggedCollectorService: LoggedCollectorService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    const redirectUrl = this.route.snapshot.queryParamMap.get("redirect");

    this.loginForm.errors;

    this.authService
      .login(this.loginForm.value)
      .pipe(
        tap((data) => {
          this.persistenceService.save(CONSTANTS.JWT_TOKEN_KEY, data.token);
        }),
        switchMap(() => this.profileService.getPersonalProfile()),
        tap((collector) => {
          this.persistenceService.save(
            CONSTANTS.LOGGED_COLLECTOR_KEY,
            JSON.stringify(collector)
          );
          this.loggedCollectorService.setCurrentCollector(collector);
        }),
        catchError((error) => {
          this.loginForm.patchValue({ password: "" });

          if (error instanceof HttpErrorResponse) {
            if (error.status >= 400 && error.status < 500) {
              this.loginForm.setErrors({ invalidCredentials: true });
            }
          } else {
            this.loginForm.setErrors({ unknownError: true });
          }

          return EMPTY;
        })
      )
      .subscribe((data) => {
        if (redirectUrl) {
          this.router.navigateByUrl(redirectUrl);
        } else {
          this.router.navigateByUrl("");
        }
      });
  }

  hasInvalidCredentialsError(): boolean {
    return this.loginForm.hasError("invalidCredentials");
  }

  hasUnknownError(): boolean {
    return this.loginForm.hasError("unknownError");
  }

  
}
