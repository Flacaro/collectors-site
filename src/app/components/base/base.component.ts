import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";

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
  sideNavConfig: SideNavConfig = {
    mode: "side",
    opened: true,
  };

  isUserLogged: boolean = true;

  isMobile: boolean = false;

  publicRoutes: AppRoute[] = [
    {
      link: "/disks",
      name: "All disks",
    },
    {
      link: "/tracks",
      name: "All tracks",
    },
  ];

  protectedRoutes: AppRoute[] = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/profile",
      name: "Profile",
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
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
