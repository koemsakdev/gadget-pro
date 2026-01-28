import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline, heart } from 'ionicons/icons';
import { IonCard, IonButton, IonIcon, IonCardContent, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [IonCard, IonButton, IonIcon, IonCardContent, IonText, CommonModule],
  standalone: true
})
export class ProductCardComponent implements OnInit {
  @Input() p: any;
  @Output() add = new EventEmitter();
  @Output() fav = new EventEmitter();
  toggleFavorite(product: any) {
    product.isFavorite = !product.isFavorite;
    this.fav.emit(product);
  }

  addToCart(product: any) {
    this.add.emit(product);
  }

  constructor() {
    addIcons({ cartOutline, heartOutline, heart })
  }

  ngOnInit() { }

}
