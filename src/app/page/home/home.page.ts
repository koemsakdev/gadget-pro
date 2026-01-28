import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
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
import {
  desktopOutline,
  laptopOutline,
  searchOutline,
  headsetOutline,
  add,
  star,
  chevronForwardOutline,
  chevronBackOutline,
} from 'ionicons/icons';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { BestsellerCardComponent } from '../../components/bestseller-card/bestseller-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
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
    ProductCardComponent,
    BestsellerCardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  bestSelling = [
    {
      name: 'MacBook Air M1 chip',
      price: 999.0,
      image:
        'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mba_13_15_79c9165d6_2x.jpg',
    },
    {
      name: 'HP Pavilion Gaming',
      price: 766.74,
      image:
        'https://m.media-amazon.com/images/I/71woYFid19L._AC_UY327_FMwebp_QL65_.jpg',
    },
  ];

  bestSellers: Product[] = [];
  popularProducts: Product[] = [];

  bannerHero = [
    {
      title: 'Razer Iskur V2 X',
      image:
        'https://assets2.razerzone.com/images/pnx.assets/42af31f0f4ac80cf91853ca94c0b497a/razer-2xko-iskurv2x_desktop-1920x700.webp',
    },
    {
      title: 'Razer Kitsune',
      image:
        'https://assets2.razerzone.com/images/pnx.assets/5bb4100edca4d5d9626df72684375779/razer-2xko-kitsune_desktop-1920x700.webp',
    },
    {
      title: 'Razer BlackShark V3 Pro',
      image:
        'https://assets2.razerzone.com/images/pnx.assets/5c2d7ff8427a39a80650068abd4e719b/razer-2xko-bsv3proxbox_desktop-1920x700.webp',
    },
    {
      title: 'Razer Viper V3 Pro SE',
      image:
        'https://assets2.razerzone.com/images/pnx.assets/4e3f6e58165b0c6a3288bd6f4ef5ee80/razer-viper-v3-pro-se-comparison-desktop.webp',
    },
  ];

  selectedCategory: string = 'Laptops';
  categories = [
    {
      category_id: 1,
      name: 'Laptops',
      icon_img: './assets/icon/laptops.svg',
    },
    {
      category_id: 2,
      name: 'Headsets',
      icon_img: './assets/icon/headsets.svg',
    },
    {
      category_id: 3,
      name: 'Chairs',
      icon_img: './assets/icon/gaming-chair.svg',
    },
    {
      category_id: 4,
      name: 'Speakers',
      icon_img: './assets/icon/speaker.svg',
    },
    {
      category_id: 5,
      name: 'Accessories',
      icon_img: './assets/icon/accessory.svg',
    },
  ];

  selectCategory(category_name: string) {
    this.selectedCategory = category_name;
    this.loadData();
  }

  handleAddToCart(product: any) {
    console.log('Added to cart:', product.name);
    // Add your cart logic here
  }

  handleFavorite(product: any) {
    console.log('Toggled favorite for:', product.name);
  }
  handleOrder(product: any) {
    console.log('Order placed for:', product.name);
    // Add navigation or cart logic here
  }

  loadData() {
    this.productService
      .getBestSellersByCategory(this.selectedCategory, 6)
      .subscribe((data) => (this.bestSellers = data));
    this.productService
      .getPopularByCategory(this.selectedCategory, 6)
      .subscribe((data) => (this.popularProducts = data));
  }

  constructor(private productService: ProductService) {
    addIcons({
      searchOutline,
      laptopOutline,
      desktopOutline,
      headsetOutline,
      add,
      star,
      chevronForwardOutline,
      chevronBackOutline,
    });
  }

  ngOnInit() {
    this.loadData();
  }
}
