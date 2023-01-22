import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  // private API_URL = CONSTANTS.IN_MEMORY_API_URL;

  ngOnInit(): void {
  }

  // @Input() collection!: Collection;

  // getCollection(): void {
  //   this.homeService.getCollection().subscribe((data: Collection) => {
  //     this.collection = data;
  //   }

    // );

  
}


