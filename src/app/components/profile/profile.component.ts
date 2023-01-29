import { Component, OnInit } from '@angular/core';
import { LoggedCollectorService } from 'src/app/security/logged-collector.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public loggedCollectorService: LoggedCollectorService) { }

  ngOnInit(): void {
  }

  //prendo il valore del collezionista loggato
  get loggedCollector() {
    return this.loggedCollectorService.getCurrentCollectorValue();
  }


 


}
