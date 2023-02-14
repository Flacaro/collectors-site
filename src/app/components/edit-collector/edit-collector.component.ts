import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Collector } from 'src/app/models/collector';
import { LoggedCollectorService } from 'src/app/security/logged-collector.service';
import { CollectorService } from 'src/app/services/collector.service';

@Component({
  selector: 'app-edit-collector',
  templateUrl: './edit-collector.component.html',
  styleUrls: ['./edit-collector.component.scss']
})
export class EditCollectorComponent implements OnInit {

  collector$!: Observable<Collector>;
  loggedCollector!: any;
  editCollectorForm!: FormGroup;

  constructor(
    private collectorService: CollectorService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loggedCollectorService: LoggedCollectorService
  ) { }

  ngOnInit(): void {

    this.loggedCollector = this.loggedCollectorService.getCurrentCollectorValue();

    this.collector$ = this.collectorService.getCollectorById(this.loggedCollector.id);

    this.editCollectorForm = this.formBuilder.group({
      username: [""],
    });

    this.collector$.subscribe((collector) => {
      this.editCollectorForm.patchValue({
        username: collector.username,
      });
    }
    );
    
    

  }

  onSubmit() {
    this.collectorService.editCollector(this.loggedCollector.id, this.editCollectorForm.value).subscribe();
    window.history.back();
  }



}
