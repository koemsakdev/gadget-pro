import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline, heart, star, starHalf, starHalfOutline } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FavoritesService } from 'src/app/services/favorites.service';

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
  @Output() favoriteChanged = new EventEmitter<any>();

  toggleFavorite(event: Event, item: any) {
    event.stopPropagation();
    item.isFavorite = this.favService.toggleFavorite(item.id);
    this.favoriteChanged.emit(item);
  }

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

  constructor(private favService: FavoritesService) {
    addIcons({ star, cartOutline, heartOutline, heart, starHalf, starHalfOutline });
  }

  ngOnInit() { }
}
