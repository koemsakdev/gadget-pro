import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonBackButton,
  IonSearchbar,
  IonText,
  ActionSheetController,
  IonBadge
} from '@ionic/angular/standalone';
import { Product } from 'src/app/models/product.model';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductService } from 'src/app/services/product.service';
import {
  chevronBackOutline,
  cartOutline,
  optionsOutline,
  searchOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonSearchbar,
    IonBackButton,
    IonCol,
    IonRow,
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ProductCardComponent,
    IonBadge
  ],
})
export class PopularPage implements OnInit {
  popularProducts: Product[] = [];
  filteredProducts: Product[] = [];
  cartCount = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private actionSheetCtrl: ActionSheetController,
    private favService: FavoritesService
  ) {
    addIcons({
      cartOutline,
      optionsOutline,
      searchOutline,
      chevronBackOutline,
    });
  }

  handleSearch(event: any) {
    const query = event.detail.value.toLowerCase().trim();
    console.log('Search query:', query);

    if (!query) {
      this.filteredProducts = [...this.popularProducts];
      return;
    }

    this.filteredProducts = this.popularProducts.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    });
  }

  handleAddToCart(product: any) {
    this.cartService.addToCart(product);
  }

  currentSort: string = 'all';
  async presentSortSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Sort Products By',
      buttons: [
        {
          text: 'All Products',
          cssClass: this.currentSort === 'all' ? 'selected-sort' : '',
          handler: () => this.sortProducts('all'),
        },
        {
          text: 'Name: A to Z',
          cssClass: this.currentSort === 'name-asc' ? 'selected-sort' : '',
          handler: () => this.sortProducts('name-asc'),
        },
        {
          text: 'Name: Z to A',
          cssClass: this.currentSort === 'name-desc' ? 'selected-sort' : '',
          handler: () => this.sortProducts('name-desc'),
        },
        {
          text: 'Price: Low to High',
          cssClass: this.currentSort === 'price-asc' ? 'selected-sort' : '',
          handler: () => this.sortProducts('price-asc'),
        },
        {
          text: 'Price: High to Low',
          cssClass: this.currentSort === 'price-desc' ? 'selected-sort' : '',
          handler: () => this.sortProducts('price-desc'),
        },
        {
          text: 'Top Rated',
          cssClass: this.currentSort === 'rating' ? 'selected-sort' : '',
          handler: () => this.sortProducts('rating'),
        },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await actionSheet.present();
  }

  sortProducts(type: string) {
    this.currentSort = type;
    if (type === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (type === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (type === 'rating') {
      // Accessing the nested metrics object
      this.filteredProducts.sort((a, b) => b.metrics.rating - a.metrics.rating);
    } else if (type === 'name-asc') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'name-desc') {
      this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (type === 'all') {
      this.filteredProducts = [...this.popularProducts];
    }
  }

  getSortLabel(type: string): string {
    const labels: { [key: string]: string } = {
      all: 'Default',
      'name-asc': 'A to Z',
      'name-desc': 'Z to A',
      'price-asc': 'Cheapest',
      'price-desc': 'Expensive',
      rating: 'Top Rated',
    };
    return labels[type] || 'Sort By';
  }

  

  ngOnInit() {
    this.productService.getPopular().subscribe((data) => {
      const processedData = data.map(product => ({
        ...product,
        isFavorite: this.favService.isFavorite(product.id)
      }));
      
      this.popularProducts = processedData;
      this.filteredProducts = [...processedData];
    });

    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
}
