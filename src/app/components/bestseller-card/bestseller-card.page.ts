import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-bestseller-card',
  templateUrl: './bestseller-card.page.html',
  styleUrls: ['./bestseller-card.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BestsellerCardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
