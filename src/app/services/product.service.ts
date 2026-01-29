import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private readonly DATA_URL = 'assets/data/products.json';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.DATA_URL);
  }

  getBestSellers(limit?: number): Observable<Product[]> {
    return this.getAll().pipe(
      map(products =>
        products.filter(p => p.tags.includes('BEST_SELLER'))
                .slice(0, limit ?? products.length)
      )
    );
  }

  getPopular(limit?: number): Observable<Product[]> {
    return this.getAll().pipe(
      map(products =>
        products.filter(p => p.tags.includes('POPULAR'))
                .slice(0, limit ?? products.length)
      )
    );
  }

  getPopularByCategory(category: string, limit?: number): Observable<Product[]> {
    return this.getAll().pipe(
      map(products =>
        products.filter(p => p.tags.includes('POPULAR') && p.category === category)
                .slice(0, limit ?? products.length)
      )
    );
  }

  getBestSellersByCategory(category: string, limit?: number): Observable<Product[]> {
    return this.getAll().pipe(
      map(products =>
        products.filter(p => p.tags.includes('BEST_SELLER') && p.category === category)
                .slice(0, limit ?? products.length)
      )
    );
  }

  // getFavoriteProduct
}
