import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { HeaderComponent } from "./components/header/header.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_FORMATS, NativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { ListComponent } from "./components/list/list.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AuthComponent } from "./components/auth/auth.component";
import { BaseComponent } from "./components/base/base.component";
import { MatListModule } from "@angular/material/list";
import { AvatarPhotoComponent } from "./components/avatar-photo/avatar-photo.component";
import { LayoutModule } from "@angular/cdk/layout";
import { CollectionDetailsComponent } from "./components/collection-details/collection-details.component";
import { DiskDetailsComponent } from "./components/disk-details/disk-details.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MatDialogModule } from "@angular/material/dialog";
import { JwtTokenInterceptor } from "./security/jwt-token.interceptor";

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatDialogModule,
  NativeDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    SearchBarComponent,
    HomeComponent,
    ListComponent,
    AuthComponent,
    BaseComponent,
    AvatarPhotoComponent,
    CollectionDetailsComponent,
    DiskDetailsComponent,
    DialogComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...materialModules,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}