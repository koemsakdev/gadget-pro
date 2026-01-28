import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  date: string;
  type: 'order' | 'promo' | 'system';
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications: Notification[] = [
    // TODAY
    {
      id: 1,
      title: 'Order Delivered',
      message: 'Your Razer Blade 14 has been delivered to your front door.',
      time: '10:30 AM',
      date: 'Today',
      type: 'order',
      read: false,
    },
    {
      id: 2,
      title: 'Flash Sale!',
      message:
        "50% off on all gaming mice for the next 2 hours. Don't miss out!",
      time: '09:00 AM',
      date: 'Today',
      type: 'promo',
      read: false,
    },
    {
      id: 3,
      title: 'Payment Successful',
      message: 'Payment for order #99281 has been processed successfully.',
      time: '07:15 AM',
      date: 'Today',
      type: 'order',
      read: true,
    },

    // YESTERDAY
    {
      id: 4,
      title: 'System Update',
      message:
        'App version 2.4.0 is now live with improved stability and fixes.',
      time: '04:20 PM',
      date: 'Yesterday',
      type: 'system',
      read: true,
    },
    {
      id: 5,
      title: 'Back in Stock!',
      message: 'The mechanical keyboard you were watching is back in stock.',
      time: '01:00 PM',
      date: 'Yesterday',
      type: 'promo',
      read: true,
    },
    {
      id: 6,
      title: 'Security Alert',
      message: 'A new login was detected from a Chrome browser on Windows.',
      time: '08:45 AM',
      date: 'Yesterday',
      type: 'system',
      read: false,
    },

    // LAST WEEK
    {
      id: 7,
      title: 'Package Shipped',
      message: 'Your order #99210 is on its way. Track your package now.',
      time: 'Jan 26',
      date: 'Last Week',
      type: 'order',
      read: true,
    },
    {
      id: 8,
      title: 'Welcome Gift',
      message:
        'Thanks for joining! Here is a 10% discount code for your first purchase.',
      time: 'Jan 24',
      date: 'Last Week',
      type: 'promo',
      read: true,
    },
    {
      id: 9,
      title: 'Cloud Storage Full',
      message:
        'Your backup storage is 90% full. Upgrade now to keep data safe.',
      time: 'Jan 22',
      date: 'Last Week',
      type: 'system',
      read: true,
    },
    {
      id: 10,
      title: 'Survey Request',
      message: 'How was your last purchase? Tell us and get 50 points.',
      time: 'Jan 20',
      date: 'Last Week',
      type: 'promo',
      read: true,
    },
  ];

  private unreadCount = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCount.asObservable();

  constructor() {
    this.updateCount();
  }

  getNotifications() {
    return this.notifications;
  }

  markAsRead(id: number) {
    const note = this.notifications.find((n) => n.id === id);
    if (note) {
      note.read = true;
      this.updateCount();
    }
  }

  markAllAsRead() {
    this.notifications.forEach((n) => (n.read = true));
    this.updateCount();
  }

  deleteNote(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.updateCount();
  }

  private updateCount() {
    const count = this.notifications.filter((n) => !n.read).length;
    this.unreadCount.next(count);
  }
}
