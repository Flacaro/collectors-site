import { Component, EventEmitter, Input, Output } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/security/auth.service";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {

  @Input() isMobile: boolean = false;

  @Output() toggleSideNav = new EventEmitter<void>();

  notification$ = this.notificationService.getNotifications();

  isNotificationMenuOpen = false;

  constructor(
    private loggedCollectorService: LoggedCollectorService, 
    private authService: AuthService,
    private notificationService: NotificationService
    ) {}

  isCollectorLogged(): Observable<{isLogged: boolean}> {
    return this.loggedCollectorService.getCurrentCollector().pipe(
      map(collector => ({isLogged: collector === null}))
    )
  }

  logoutCollector() {
    this.authService.logout();
  }


  deleteNotification(id: number) {
    this.notificationService.deleteNotification(id).subscribe(() => {
      this.isNotificationMenuOpen = false;
      this.notification$ = this.notificationService.getNotifications();
    });
  }



}
