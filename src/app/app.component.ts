import { Component, OnInit } from "@angular/core";
import { LoggedCollectorService } from "./security/logged-collector.service";

@Component({
  selector: "app-root",
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(private loggedCollectorService: LoggedCollectorService) {}

  ngOnInit(): void {
    // All'avvio dell'applicazione si controlla se nel local storage è presente un utente loggato
    // Se è presente, allora viene impostato come utente loggato
    this.loggedCollectorService.loadCurrentCollectorIfExists();
  }
}
