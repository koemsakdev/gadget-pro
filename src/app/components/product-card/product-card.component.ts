import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline, heart } from 'ionicons/icons';
import { IonCard, IonButton, IonIcon, IonCardContent, IonText, IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [IonCard, IonButton, IonIcon, IonCardContent, IonText, CommonModule, IonBadge],
  standalone: true
})
export class ProductCardComponent implements OnInit {
  @Input() p: any;
  @Output() add = new EventEmitter();
  @Output() favoriteChanged = new EventEmitter<any>();
  toggleFavorite(event: Event, item: any) {
    event.stopPropagation(); 
    item.isFavorite = this.favService.toggleFavorite(item.id);
    this.favoriteChanged.emit(item);
  }

  addToCart(event: Event, product: any) {
    event.stopPropagation();
    this.add.emit(product);
    this.cartService.addToCart(product);
  }

  getQuantity(): number {
    return this.cartService.getQuantityById(this.p.id);
  }

  constructor(private favService: FavoritesService, private cartService: CartService) {
    addIcons({cartOutline,heartOutline,heart});
  }

  ngOnInit() { }

}
