import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./menus/menus.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'favorite',
    loadComponent: () => import('./page/favorite/favorite.page').then( m => m.FavoritePage)
  },
  {
    path: 'notification',
    loadComponent: () => import('./page/notification/notification.page').then( m => m.NotificationPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./page/account/account.page').then( m => m.AccountPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./page/cart/cart.page').then( m => m.CartPage)
  }
];
