import { Routes } from '@angular/router';
import { MenusPage } from './menus.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: MenusPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../page/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('../page/favorite/favorite.page').then((m) => m.FavoritePage),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../page/cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('../page/notification/notification.page').then((m) => m.NotificationPage),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('../page/account/account.page').then((m) => m.AccountPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];
