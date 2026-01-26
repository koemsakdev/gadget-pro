import { Component, EnvironmentInjector, inject } from '@angular/core';
import {IonIcon, IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, homeOutline, cartOutline, notificationsOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menus',
  templateUrl: 'menus.page.html',
  styleUrls: ['menus.page.scss'],
  imports: [IonIcon, IonTabs, IonTabBar, IonTabButton],
})
export class MenusPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ homeOutline, heartOutline, cartOutline, notificationsOutline, personOutline });
  }
}
