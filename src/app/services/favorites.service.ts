// favorites.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'favorites';

  getFavoriteIds(): number[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  toggleFavorite(productId: number): boolean {
    let ids = this.getFavoriteIds();
    const isAdded = !ids.includes(productId);

    if (isAdded) {
      ids.push(productId);
    } else {
      ids = ids.filter(id => id !== productId);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(ids));
    return isAdded; // Returns true if added, false if removed
  }

  isFavorite(productId: number): boolean {
    return this.getFavoriteIds().includes(productId);
  }
}