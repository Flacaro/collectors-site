import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Collection } from '../collection';
import { Collector } from '../collector';
import { CONSTANTS } from '../constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {



  constructor(
    private http: HttpClient
  ) { }

  private API_URL = CONSTANTS.IN_MEMORY_API_URL;

  ngOnInit(): void {
  }


  



}


