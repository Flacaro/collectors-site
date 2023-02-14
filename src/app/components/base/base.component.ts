import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Collection } from "src/app/models/collection";
import { CONSTANTS } from "src/app/constants";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { ActivatedRoute } from "@angular/router";

type SideNavConfig = {
  mode: "side" | "over";
  opened: boolean;
};

type AppRoute = {
  link: string;
  name: string;
};

@Component({
  selector: "app-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
})
export class BaseComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private persistenceService: PersistenceService,
    private route: ActivatedRoute,
  ) {}


  collections: Collection[] = [];

  sideNavConfig: SideNavConfig = {
    mode: "side",
    opened: true,
  };

  isUserLogged: boolean = !!this.persistenceService.get(CONSTANTS.JWT_TOKEN_KEY);
  isMobile: boolean = false;


  //if isUserLogged is true, then the user is logged in and we can show the protected routes

  publicRoutes: AppRoute[] = [
    {
      link: "/",
      name: "Home",
    },
  ];

  protectedRoutes: AppRoute[] = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "personal/profile",
      name: "Profile",
    },
    {
      link: "personal/collections",
      name: "Collections",
    },
    {
      link: "personal/collections/favorites",
      name: "Favourites collections",
    },
    {
      link: "personal/disks/favorites",
      name: "Favourites disks",
    },

    {
      link: "personal/collections/sharedWithMe",
      name: "Collections shared with me",
    }
  ];

 

  ngOnInit(): void {
    
    // this.collection$ = this.collectionService.getCollection(collectionId);
    // se e' mobile allora bisogna nascondere la sidenav, altrimenti lasciarla aperta
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .subscribe((isMobile) => {
        this.isMobile = isMobile.matches;
        if (isMobile.matches) {
          this.sideNavConfig = {
            mode: "over",
            opened: false,
          };
        } else {
          this.sideNavConfig = {
            mode: "side",
            opened: true,
          };
        }
      });
  }
}
