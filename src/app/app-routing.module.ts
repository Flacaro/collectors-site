import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CollectionDetailsComponent } from "./components/collection-details/collection-details.component";
import { AuthComponent } from "./components/auth/auth.component";
import { BaseComponent } from "./components/base/base.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { DiskDetailsComponent } from "./components/disk-details/disk-details.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { IsAlreadyLoggedGuard } from "./services/is-already-logged.guard";
import { AuthGuard } from "./security/auth.guard";
import { CollectionsComponent } from "./components/collections/collections.component";
import { CollectionsFavouritesComponent } from "./components/collections-favourites/collections-favourites.component";
import { DisksFavouritesComponent } from "./components/disks-favourites/disks-favourites.component";


const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      {
        path: "login",
        component: LoginComponent,
        canActivate: [IsAlreadyLoggedGuard],
      },
      { path: "registration", component: RegistrationComponent },
    ],
  },
  {
    path: "",
    component: BaseComponent,
    children: [
      { path: "", component: HomeComponent },
      // { path: "disks", component: NewDiskComponent, canActivate: [AuthGuard] },
      { path: "public/collections/:collectionId", component: CollectionDetailsComponent },
      { path: "public/collections/:collectionId/disks", component: CollectionDetailsComponent },
      { path: "public/collections/:collectionId/disks/:diskId", component: DiskDetailsComponent },
      { path: "private/collectors/profile", component: ProfileComponent, canActivate: [AuthGuard] },
      { path: "private/collectors/profile/:id", component: ProfileComponent, canActivate: [AuthGuard] },
      { path : "public/collections", component: HomeComponent },
      { path: "private/collections", component: CollectionsComponent, canActivate: [AuthGuard]},
      { path: "private/collections/:collectionId", component: DiskDetailsComponent, canActivate: [AuthGuard]},
      { path: "private/collectors/favourites", component: CollectionsFavouritesComponent, canActivate: [AuthGuard]},
      { path: "private/collectors/disks/favourites", component: DisksFavouritesComponent, canActivate: [AuthGuard]}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
