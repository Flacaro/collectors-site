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
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AuthComponent } from "./components/auth/auth.component";
import { BaseComponent } from "./components/base/base.component";
import { MatListModule } from "@angular/material/list";
import { LayoutModule } from "@angular/cdk/layout";
import { CollectionDetailsComponent } from "./components/collection/collection-details/collection-details.component";
import { DiskDetailsComponent } from "./components/disk/disk-details/disk-details.component";
import { DialogComponent } from "./components/disk/diskAddDialog/dialog.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MatDialogModule } from "@angular/material/dialog";
import { JwtTokenInterceptor } from "./security/jwt-token.interceptor";
import { CollectionsComponent } from './components/collection/collections/collections.component';
import { CollectionsFavouritesComponent } from './components/collection/collections-favourites/collections-favourites.component';
import { DisksFavouritesComponent } from './components/disk/disks-favourites/disks-favourites.component';
import { PersistenceService } from "./services/persistence/persistence-service";
import { LocalStoragePersistenceService } from "./services/persistence/local-storage-persistence.service";
import { TrackDialogComponent } from './components/track/track-dialog/track-dialog.component';
import { CollectionDialogComponent } from './components/collection/collection-dialog/collection-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FavListComponent } from './components/collection/fav-list/fav-list.component';
import { CollectionsSharedWithMeComponent } from './components/collection/collections-shared-with-me/collections-shared-with-me.component'
import { TrackDetailsComponent } from './components/track/track-details/track-details.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ImportDiskComponent } from './components/disk/import-disk/import-disk.component';
import {MatStepperModule} from '@angular/material/stepper';
import { EditCollectionComponent } from './components/collection/edit-collection/edit-collection.component';
import { EditDiskComponent } from './components/disk/edit-disk/edit-disk.component';
import { EditCollectorComponent } from './components/edit-collector/edit-collector.component';
import { ImagesDiskListComponent } from './components/disk/images-disk-list/images-disk-list.component';
import { EditTrackComponent } from './components/track/edit-track/edit-track.component';
import { ListOfCollectorThatShareCollectionComponent } from './components/list-of-collector-that-share-collection/list-of-collector-that-share-collection.component';
import { AddCollectorToShareComponent } from './components/collection/add-collector-to-share/add-collector-to-share.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';

import {OverlayModule} from '@angular/cdk/overlay';
import { NotificationMenuComponent } from './components/notification-menu/notification-menu.component';

import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { PublicStatisticsComponent } from './components/public-statistics/public-statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { CardComponent } from './components/common/card/card.component';
import { BackButtonComponent } from './components/common/back-button/back-button.component';
import { CardContainerComponent } from './components/common/card-container/card-container.component';
import { StatisticsComponent } from './components/common/statistics/statistics.component';


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
  NativeDateModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatBadgeModule,
  OverlayModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    SearchBarComponent,
    HomeComponent,
    AuthComponent,
    BaseComponent,
    CollectionDetailsComponent,
    DiskDetailsComponent,
    DialogComponent,
    ProfileComponent,
    CollectionsComponent,
    CollectionsFavouritesComponent,
    DisksFavouritesComponent,
    TrackDialogComponent,
    CollectionDialogComponent,
    FavListComponent,
    CollectionsSharedWithMeComponent,
    TrackDetailsComponent,
    ImportDiskComponent,
    EditCollectionComponent,
    EditDiskComponent,
    EditCollectorComponent,
    ImagesDiskListComponent,
    EditTrackComponent,
    ListOfCollectorThatShareCollectionComponent,
    AddCollectorToShareComponent,
    NotificationMenuComponent,
    PublicProfileComponent,
    PublicStatisticsComponent,
    CardComponent,
    BackButtonComponent,
    CardContainerComponent,
    StatisticsComponent

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
    NgChartsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    },
    {
      provide: PersistenceService,
      useClass: LocalStoragePersistenceService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}