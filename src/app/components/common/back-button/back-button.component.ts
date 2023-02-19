import { Component, Input, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {

  @Input() url: string = "/";

  @Input() preserveQueryParams: boolean = false;

}
