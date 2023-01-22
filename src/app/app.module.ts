import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { HomeComponent } from "./components/home/home.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { NewDiskComponent } from "./components/new-disk/new-disk.component";
import { NewCollectionComponent } from "./components/new-collection/new-collection.component";
import { NewTrackComponent } from "./components/new-track/new-track.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { ListComponent } from "./components/list/list.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthComponent } from "./components/auth/auth.component";
import { BaseComponent } from './components/base/base.component';
import { MatListModule } from '@angular/material/list';
import { AvatarPhotoComponent } from './components/avatar-photo/avatar-photo.component';
import {LayoutModule} from '@angular/cdk/layout';

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

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent,
    HeaderComponent,
    SearchBarComponent,
    HomeComponent,
    NewDiskComponent,
    NewCollectionComponent,
    NewTrackComponent,
    ListComponent,
    AuthComponent,
    BaseComponent,
    AvatarPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...materialModules,
    RouterModule.forRoot([
     
      { path: "auth", component: AuthComponent,
        children: [
          { path: "", redirectTo: "login", pathMatch: "full"},
          { path: "login", component: LoginComponent },
          { path: "registration", component: RegistrationComponent }
        ]
          },
      { path: "", component: BaseComponent,
        children: [
          { path: "", component: HomeComponent },
          { path: "disks", component: NewDiskComponent },
          { path: "collections", component: NewCollectionComponent },
          { path: "tracks", component: NewTrackComponent }

        ]
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
