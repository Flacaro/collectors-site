import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CollectionDetailsComponent } from "./components/collection/collection-details/collection-details.component";
import { AuthComponent } from "./components/auth/auth.component";
import { BaseComponent } from "./components/base/base.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { DiskDetailsComponent } from "./components/disk/disk-details/disk-details.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { IsAlreadyLoggedGuard } from "./services/is-already-logged.guard";
import { AuthGuard } from "./security/auth.guard";
import { CollectionsComponent } from "./components/collection/collections/collections.component";
import { CollectionsFavouritesComponent } from "./components/collection/collections-favourites/collections-favourites.component";
import { DisksFavouritesComponent } from "./components/disk/disks-favourites/disks-favourites.component";
import { FavListComponent } from "./components/collection/fav-list/fav-list.component";
import { CollectionsSharedWithMeComponent } from "./components/collection/collections-shared-with-me/collections-shared-with-me.component";
import { TrackDetailsComponent } from "./components/track/track-details/track-details.component";

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
      { path: "public/collections/:collectionId", component: CollectionDetailsComponent },
      { path: "public/collections/:collectionId/disks", component: CollectionDetailsComponent },
      { path: "public/collections/:collectionId/disks/:diskId/tracks/:trackId", component: TrackDetailsComponent},
      { path: "public/collections/:collectionId/disks/:diskId", component: DiskDetailsComponent },
      { path: "private/collectors/profile", component: ProfileComponent, canActivate: [AuthGuard] },
      { path: "private/collectors/profile/:id", component: ProfileComponent, canActivate: [AuthGuard] },
      { path: "private/collectors/collections/withMe", component: CollectionsSharedWithMeComponent, canActivate: [AuthGuard] },
      { path: "public/collections", component: HomeComponent },
      { path: "private/collections", component: CollectionsComponent, canActivate: [AuthGuard]},
      { path: "private/collections/:collectionId/collectors", component: FavListComponent, canActivate: [AuthGuard]},
      { path: "private/collections/:collectionId", component: CollectionDetailsComponent, canActivate: [AuthGuard]},
      { path: "private/collections/:collectionId/disks/:diskId", component: DiskDetailsComponent, canActivate: [AuthGuard]},
      { path: "private/collectors/favourites", component: CollectionsFavouritesComponent, canActivate: [AuthGuard]},
      { path: "private/collectors/collections/favourites", component: CollectionsFavouritesComponent, canActivate: [AuthGuard]},
      { path: "private/collectors/disks/favourites", component: DisksFavouritesComponent, canActivate: [AuthGuard]},
      { path: "private/collections/:collectionId/disks/", component: CollectionDetailsComponent, canActivate: [AuthGuard] },
      { path: "private/collections/:collectionId/disks/:diskId/tracks", component: DiskDetailsComponent, canActivate: [AuthGuard]},
      { path: "private/collections/:collectionId/disks/:diskId/tracks/:trackId", component: TrackDetailsComponent, canActivate: [AuthGuard]},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
