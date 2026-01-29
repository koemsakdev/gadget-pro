import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline, heart, star, starHalf, starHalfOutline } from 'ionicons/icons';
import { IonButton, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-bestseller-card',
  templateUrl: './bestseller-card.component.html',
  styleUrls: ['./bestseller-card.component.scss'],
  imports: [IonButton, IonIcon, CommonModule, IonBadge],
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

  onOrder(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(this.item);
    this.order.emit(this.item);
  }

  // addToCart(product: any) {
  //   this.cartService.addToCart(product);
  // }

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

  getQuantity(): number {
    return this.cartService.getQuantityById(this.item.id);
  }

  constructor(private favService: FavoritesService, private cartService: CartService) {
    addIcons({ star, cartOutline, heartOutline, heart, starHalf, starHalfOutline });
  }

  ngOnInit() { }
}
