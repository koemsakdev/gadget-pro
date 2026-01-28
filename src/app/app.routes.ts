import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./menus/menus.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  }

];
