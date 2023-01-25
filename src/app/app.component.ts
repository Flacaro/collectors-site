import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CONSTANTS } from "./constants";
import { LoggedCollectorService } from "./services/logged-collector.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild('dialogContent', {read: TemplateRef}) dialogTemplate!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private loggedCollectorService: LoggedCollectorService) {
  }

  ngOnInit(): void {
    this.setLoggedCollectorIfPresentInLocalStorage();
  }

  // All'avvio dell'applicazione si controlla se nel local storage è presente un utente loggato
  // Se è presente, allora viene impostato come utente loggato
  setLoggedCollectorIfPresentInLocalStorage(): void {
    const loggedCollector = localStorage.getItem(CONSTANTS.LOGGED_COLLECTOR_KEY);
    if(loggedCollector) {
      this.loggedCollectorService.setCurrentCollector(JSON.parse(loggedCollector));
      console.log("Successfully set logged collector from local storage");
    }
  }

  openDialog() {
    this.dialog.open(this.dialogTemplate, {
      width: '500px',
    })
  }

}
