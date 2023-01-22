import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input() isMobile: boolean = false;

  @Output() toggleSideNav = new EventEmitter<void>();
}
