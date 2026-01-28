import { Component, EnvironmentInjector, inject } from '@angular/core';
import {IonIcon, IonTabs, IonTabBar, IonTabButton, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, homeOutline, cartOutline, notificationsOutline, personOutline } from 'ionicons/icons';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menus',
  templateUrl: 'menus.page.html',
  styleUrls: ['menus.page.scss'],
  imports: [IonBadge, IonIcon, IonTabs, IonTabBar, IonTabButton, CommonModule],
})
export class MenusPage {
  public environmentInjector = inject(EnvironmentInjector);
  unreadCount = 0;

  constructor(private navService: NotificationService) {
    addIcons({ homeOutline, heartOutline, cartOutline, notificationsOutline, personOutline });
    this.navService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });
  }
}
