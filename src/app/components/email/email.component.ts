import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit{

  emails$!: Observable<Email []>
  constructor() { }

  ngOnInit(): void {
  
  }

}
