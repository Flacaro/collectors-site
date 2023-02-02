import { Component, EventEmitter, Input, Output } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/security/auth.service";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input() isMobile: boolean = false;

  @Output() toggleSideNav = new EventEmitter<void>();

  constructor(private loggedCollectorService: LoggedCollectorService, private authService: AuthService) {}

  isCollectorLogged(): Observable<{isLogged: boolean}> {
    return this.loggedCollectorService.getCurrentCollector().pipe(
      map(collector => ({isLogged: collector === null}))
    )
  }

  logoutCollector() {
    this.authService.logout();
    //refresh the page
    // window.location.reload();
  }

}
