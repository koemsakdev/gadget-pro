import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, 
  IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOption, 
  IonItemOptions, IonButtons, IonButton, IonItemGroup, IonItemDivider 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash, cubeOutline, megaphoneOutline, settingsOutline, notificationsOffOutline } from 'ionicons/icons';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOption, IonItemOptions, IonButtons, IonButton, IonItemGroup, IonItemDivider]
})
export class NotificationPage implements OnInit {
  groupedNotifications: { date: string, items: Notification[] }[] = [];

  constructor(public navService: NotificationService) {
    addIcons({ trash, cubeOutline, megaphoneOutline, settingsOutline, notificationsOffOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const allNotes = this.navService.getNotifications();
    const groups = allNotes.reduce((acc: any, item) => {
      const date = item.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

    this.groupedNotifications = Object.keys(groups).map(date => ({
      date,
      items: groups[date]
    }));
  }

  getIcon(type: string) {
    switch (type) {
      case 'order': return 'cube-outline';
      case 'promo': return 'megaphone-outline';
      default: return 'settings-outline';
    }
  }

  onMarkRead(note: Notification) {
    this.navService.markAsRead(note.id);
    this.loadData(); // Update local UI
  }

  onMarkAllRead() {
    this.navService.markAllAsRead();
    this.loadData(); // Update local UI
  }

  onDelete(note: Notification) {
    this.navService.deleteNote(note.id);
    this.loadData(); // Update local UI
  }
}