import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonAvatar,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  personOutline,
  heartOutline,
  receiptOutline,
  helpCircleOutline,
  shieldCheckmarkOutline,
  logOutOutline,
  cameraReverse,
} from 'ionicons/icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonAvatar,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonListHeader,
  ],
})
export class AccountPage {
  constructor() {
    addIcons({
      settingsOutline,
      personOutline,
      heartOutline,
      receiptOutline,
      helpCircleOutline,
      shieldCheckmarkOutline,
      logOutOutline,
      cameraReverse,
    });
  }
}
