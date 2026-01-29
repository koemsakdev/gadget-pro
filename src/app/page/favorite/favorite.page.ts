import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { BestsellerCardComponent } from "src/app/components/bestseller-card/bestseller-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BestsellerCardComponent, RouterLink]
})
export class FavoritePage implements OnInit {
  favoriteProducts: Product[] = [];
  isFavoritesPage = true
  isLoading = true;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadFavorites();
  }

  // favorite.page.ts
  handleFavChange(product: any) {
    // If the product is no longer a favorite, remove it from the array
    if (!product.isFavorite) {
      this.favoriteProducts = this.favoriteProducts.filter(p => p.id !== product.id);
    }
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.isLoading = true;

    const savedFavs = localStorage.getItem('favorites');
    const favIds: number[] = savedFavs ? JSON.parse(savedFavs) : [];

    this.productService.getAll().subscribe((allProducts) => {
      this.favoriteProducts = allProducts.filter(p => favIds.includes(p.id))
        .map(p => ({ ...p, isFavorite: true }));

      this.isLoading = false;
    });
  }

  handleOrder(product: any) {
    console.log('Ordering favorite:', product.name);
  }
}