import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Collection } from "src/app/models/collection";
import { CollectionService } from "src/app/services/collection.service";
import { CONSTANTS } from "src/app/constants";

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

  // collection$!: Observable<Collection>;
  
  sideNavConfig: SideNavConfig = {
    mode: "side",
    opened: true,
  };
  
  isUserLogged: boolean = !!localStorage.getItem(CONSTANTS.JWT_TOKEN_KEY);
  isMobile: boolean = false;

//if isUserLogged is true, then the user is logged in and we can show the protected routes

publicRoutes: AppRoute[] = [
  {
    link: "/",
    name: "Home",
  }
];  

protectedRoutes: AppRoute[] = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "private/collectors/profile",
    name: "Profile",
  },
  {
    link: "private/collections",
    name: "Collections",
  },
  {
    link: "private/collectors/collections/favourites",
    name: "Favourites collections",
  },
  {
    link: "private/disks/favourites",
    name: "Favourites disks",
  },
];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private collectionService: CollectionService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {

    // const collectionId = this.route.snapshot.params["id"];

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
