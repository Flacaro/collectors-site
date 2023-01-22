import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('newTrack', this.newTrack);
  }

  newTrack = this.formBuilder.group({
    title: '',
    artist: '',
    album: '',
    band : '',
    compositor: '',
    time : ''
  });

  
}


