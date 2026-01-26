import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonButtons,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { desktopOutline, laptopOutline, searchOutline, headsetOutline, add, star } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonIcon,
    IonButton,
    IonButtons,
    IonAvatar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  popularProducts = [
    {
      name: 'MacBook Air',
      brand: 'Apple',
      price: 999.0,
      image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mba_13_15_79c9165d6_2x.jpg',
    },
    {
      name: 'Lenovo Yoga 7i',
      brand: 'Lenovo',
      price: 1199.99,
      image: 'https://m.media-amazon.com/images/I/71woYFid19L._AC_UY327_FMwebp_QL65_.jpg',
      discount: 10,
    },
  ];

  bestSelling = [
    { name: 'MacBook Air M1 chip', price: 999.0, image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mba_13_15_79c9165d6_2x.jpg' },
    { name: 'HP Pavilion Gaming', price: 766.74, image: 'https://m.media-amazon.com/images/I/71woYFid19L._AC_UY327_FMwebp_QL65_.jpg' },
  ];

  constructor() {
    addIcons({searchOutline,laptopOutline,desktopOutline,headsetOutline,add,star});
  }

  ngOnInit() {}
}
