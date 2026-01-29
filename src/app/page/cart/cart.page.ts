import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { addIcons } from 'ionicons';
import { addCircleOutline, removeCircleOutline, trash, cartOutline, chevronBackOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class CartPage {
  items: any[] = [];
  total: number = 0;
  isCheckoutLoading: boolean = false;

  constructor(private cartService: CartService, private alertCtrl: AlertController, private navCtrl: NavController) {
    addIcons({ addCircleOutline, removeCircleOutline, trash, cartOutline, chevronBackOutline });
  }

  ionViewWillEnter() {
    this.refreshCart();
  }

  async checkout() {
    this.isCheckoutLoading = true;

    setTimeout(async () => {
      this.isCheckoutLoading = false;
      this.cartService.clearCart();
      this.refreshCart();

      const alert = await this.alertCtrl.create({
        mode: 'ios',
        cssClass: 'success-checkout-alert',
        // We use the header/subheader for the main text
        header: 'Order Confirmed!',
        message: 'Your order has been placed. We\'ll notify you once it ships!',
        buttons: [
          {
            text: 'Shop More',
            role: 'cancel', // This helps style it as the primary action
            handler: () => {
              this.navCtrl.navigateRoot('/tabs/home');
            }
          }
        ]
      });

      await alert.present();
    }, 1500);
  }

  private processClearance() {
    this.cartService.clearCart();
    this.refreshCart();
    this.navCtrl.navigateRoot('/tabs/home');
  }

  refreshCart() {
    this.items = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
  }

  increase(product: any) {
    this.cartService.addToCart(product);
    this.refreshCart();
  }

  decrease(productId: number) {
    this.cartService.decreaseQuantity(productId);
    this.refreshCart();
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
    this.refreshCart();
  }
}