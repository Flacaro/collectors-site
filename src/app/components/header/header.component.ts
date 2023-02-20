import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable, switchMap, tap } from "rxjs";
import { CollectorNotification } from "src/app/models/collector-notification";
import { AuthService } from "src/app/security/auth.service";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

  @Input() isMobile: boolean = false;

  @Output() toggleSideNav = new EventEmitter<void>();

  notification$ = new BehaviorSubject<CollectorNotification[]>([]); 

  isNotificationMenuOpen = false;

  constructor(
    private loggedCollectorService: LoggedCollectorService, 
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
    ) {}

    ngOnInit(): void {
      this.notificationService.getNotifications().subscribe((notifications) => {
          this.notification$.next(notifications);
      })
    }

  isCollectorLogged(): Observable<{isLogged: boolean}> {
    return this.loggedCollectorService.getCurrentCollector().pipe(
      map(collector => ({isLogged: collector !== null}))
    )
  }

  logoutCollector() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }


  deleteNotification(id: number) {
    this.notificationService.deleteNotification(id).pipe(
      switchMap(() => this.notificationService.getNotifications())
    ).subscribe((notifications) => {
      this.isNotificationMenuOpen = false;
      this.notification$.next(notifications);
    });
  }



}
