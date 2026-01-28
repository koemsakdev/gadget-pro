import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonText,
  ActionSheetController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { optionsOutline, cartOutline, searchOutline } from 'ionicons/icons';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { BestsellerCardComponent } from "src/app/components/bestseller-card/bestseller-card.component";

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.page.html',
  styleUrls: ['./best-seller.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonSearchbar,
    IonIcon,
    IonButton,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BestsellerCardComponent
],
})
export class BestSellerPage implements OnInit {
  bestSellerProducts: Product[] = [];
  filteredProducts: Product[] = [];

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
      this.filteredProducts = [...this.bestSellerProducts];
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

  handleSearch(event: any) {
    const query = event.detail.value.toLowerCase().trim();
    console.log('Search query:', query);

    if (!query) {
      this.filteredProducts = [...this.bestSellerProducts];
      return;
    }

    this.filteredProducts = this.bestSellerProducts.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    });
  }

  handleOrder(product: any) {
    console.log('Order placed for:', product.name);
    // Add navigation or cart logic here
  }

  constructor(
    private productService: ProductService,
    private actionSheetCtrl: ActionSheetController,
  ) {
    addIcons({cartOutline,optionsOutline,searchOutline});
  }

  ngOnInit() {
    this.productService.getBestSellers().subscribe((data) => {
      this.bestSellerProducts = data;
      this.filteredProducts = [...data];
    });
  }
}
