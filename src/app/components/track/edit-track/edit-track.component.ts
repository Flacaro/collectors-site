import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.scss']
})
export class EditTrackComponent implements OnInit {

  editTrackForm!: FormGroup;
  collectionId!: number;
  diskId!: number;
  trackId!: number;
  track$!: Observable<Track>;

  constructor(
    private formBuilder: FormBuilder,
    private trackService: TrackService,
    private route : ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.params['collectionId'];
    this.diskId = this.route.snapshot.params['diskId'];
    this.trackId = this.route.snapshot.params['trackId'];

    this.track$ = this.trackService.getPersonalTrackById(this.collectionId, this.diskId, this.trackId);


    this.editTrackForm = this.formBuilder.group({
      title: [""],
      author: [""],
      album: [""],
      band: [""],
      artist: [""],
      time: [""],
  });

  this.track$.subscribe((track) => {
    this.editTrackForm.patchValue({
      title: track.title,
      author: track.author,
      album: track.album,
      band: track.band,
      artist: track.artist,
      time: track.time,
    });

  });
}


  onSubmit() {
    this.trackService.editTrack(this.collectionId, this.diskId, this.trackId,  this.editTrackForm.value).subscribe(
      () => {
        this.router.navigate(["../"], {relativeTo: this.route, queryParamsHandling: 'preserve' })
      }
    );
  }


}
