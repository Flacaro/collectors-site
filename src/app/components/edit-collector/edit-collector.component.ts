import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { Observable, switchMap } from "rxjs";
import { Collector } from "src/app/models/collector";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { CollectorService } from "src/app/services/collector.service";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: "app-edit-collector",
  templateUrl: "./edit-collector.component.html",
  styleUrls: ["./edit-collector.component.scss"],
})
export class EditCollectorComponent implements OnInit {
  collector$!: Observable<Collector>;
  loggedCollector!: any;
  editCollectorForm!: FormGroup;

  constructor(
    private collectorService: CollectorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loggedCollectorService: LoggedCollectorService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loggedCollector =
      this.loggedCollectorService.getCurrentCollectorValue();

    this.collector$ = this.collectorService.getCollectorById(
      this.loggedCollector.id
    );

    this.editCollectorForm = this.formBuilder.group({
      name: [""],
      surname: [""],
      email: ["", [Validators.required, Validators.email]],
      birthdate: [null],
    });

    this.collector$.subscribe((collector) => {
      this.editCollectorForm.patchValue({
        name: collector.name,
        surname: collector.surname,
        birthdate: collector.birthdate,
        email: collector.email,
      });
    });
  }

  onSubmit() {
    const collectorData = this.editCollectorForm.value;
    debugger;
    if(collectorData.birthdate) {
      collectorData.birthdate = moment(collectorData.birthdate).format("YYYY-MM-DD");
    }

    this.collectorService
      .editCollector(this.loggedCollector.id, collectorData)
      .pipe(
        switchMap(() => this.profileService.getPersonalProfile())
      )
      .subscribe((collector) => {
        this.loggedCollectorService.editCollector(collector);
        this.router.navigate(["/personal/profile"])
      });
  }
}
