import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() title = '';

  @Input() image: string | null = null;

  @Input() maxImageHeight = 250;
  @Input() maxImageWidth = 250;

}
