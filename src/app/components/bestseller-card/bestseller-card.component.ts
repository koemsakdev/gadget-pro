import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline, heart } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bestseller-card',
  templateUrl: './bestseller-card.component.html',
  styleUrls: ['./bestseller-card.component.scss'],
  imports: [IonButton, IonIcon, CommonModule],
  standalone: true
})
export class BestsellerCardComponent implements OnInit {
  @Input() item: any;
  @Output() order = new EventEmitter<any>();

  onOrder() {
    this.order.emit(this.item);
  }

  constructor() {
    addIcons({ cartOutline, heartOutline, heart })
  }

  ngOnInit() { }

}
