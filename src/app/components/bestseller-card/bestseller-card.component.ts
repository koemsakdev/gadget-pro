import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline, heart, star, starHalf, starHalfOutline } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bestseller-card',
  templateUrl: './bestseller-card.component.html',
  styleUrls: ['./bestseller-card.component.scss'],
  imports: [IonButton, IonIcon, CommonModule],
  standalone: true,
})
export class BestsellerCardComponent implements OnInit {
  @Input() item: any;
  @Output() order = new EventEmitter<any>();
  @Input() rank: number = 0;

  onOrder() {
    this.order.emit(this.item);
  }

  getStarName(starIndex: number): string {
    const rating = this.item.metrics.rating;

    if (rating >= starIndex) {
      return 'star';
    } else if (rating > starIndex - 1 && rating < starIndex) {
      return 'star-half';
    } else {
      return 'star-outline';
    }
  }

  constructor() {
    addIcons({ star, cartOutline, heartOutline, heart, starHalf, starHalfOutline });
  }

  ngOnInit() {}
}
