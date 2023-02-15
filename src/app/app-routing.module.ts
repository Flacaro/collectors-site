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
import { EditCollectionComponent } from "./components/collection/edit-collection/edit-collection.component";
import { EditDiskComponent } from "./components/disk/edit-disk/edit-disk.component";
import { EditCollectorComponent } from "./components/edit-collector/edit-collector.component";
import { ImportDiskComponent } from "./components/disk/import-disk/import-disk.component";
import { ImagesDiskListComponent } from "./components/disk/images-disk-list/images-disk-list.component";

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      // { path: "", redirectTo: "login", pathMatch: "full" },
      {path: "login", component: LoginComponent, canActivate: [IsAlreadyLoggedGuard]},
      { path: "registration", component: RegistrationComponent },
    ],
  },
  {
    path: "",
    component: BaseComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "collections", component: HomeComponent },
      { path: "personal/collections/sharedWithMe", component: CollectionsSharedWithMeComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/unshareWith", component: CollectionsSharedWithMeComponent, canActivate: [AuthGuard]},
     

      { path: "collections/:collectionId", component: CollectionDetailsComponent },
      { path: "collections/:collectionId/disks", component: CollectionDetailsComponent },
      
      { path: "collections/:collectionId/disks/:diskId/tracks/:trackId", component: TrackDetailsComponent},
      { path: "collections/:collectionId/disks/:diskId/tracks", component: DiskDetailsComponent },
      { path: "collections/:collectionId/disks/:diskId", component: DiskDetailsComponent },
      
      
      { path: "collections/:collectionId/disks/:diskId/images", component:  ImagesDiskListComponent},
      { path: "statistics/disks", component: ProfileComponent },



      { path: "personal/profile", component: ProfileComponent, canActivate: [AuthGuard] },
      { path: "personal/profile/images", component: ProfileComponent, canActivate: [AuthGuard] },
      { path: "personal/profile/images/:imageId", component: ProfileComponent, canActivate: [AuthGuard] },
      { path: "personal/collections/favorites", component: CollectionsFavouritesComponent, canActivate: [AuthGuard]},

      { path: "personal/collections", component: CollectionsComponent, canActivate: [AuthGuard]},
     
      { path: "personal/collections/:collectionId", component: CollectionDetailsComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/disks/", component: CollectionDetailsComponent, canActivate: [AuthGuard] },
      { path: "personal/collections/:collectionId/disks/:diskId/tracks", component: DiskDetailsComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/disks/:diskId/tracks/:trackId", component: TrackDetailsComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/disks/:diskId", component: DiskDetailsComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/edit", component: EditCollectionComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/disks/:diskId/edit", component: EditDiskComponent, canActivate: [AuthGuard]},
      { path: "personal/collectors/:collectorId/edit", component: EditCollectorComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/disks/:diskId/images", component:  ImagesDiskListComponent},


      { path: "personal/disks/favorites", component: DisksFavouritesComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/disks/:diskId/images", component: DiskDetailsComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/disks/:diskId/tracks", component: DiskDetailsComponent, canActivate: [AuthGuard]},
      { path: "personal/collections/:collectionId/disks/:diskId/tracks/:trackId", component: TrackDetailsComponent, canActivate: [AuthGuard]},

      { path: "search/disks", component: ImportDiskComponent, canActivate: [AuthGuard] },
      
  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
