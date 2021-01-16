import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../account/shared/auth.service';
import { CheckoutService } from '../shared/checkout.service';
import { CartService } from '../../cart/shared/cart.service';
import { MessageService } from '../../messages/message.service';
import { OrderService } from '../../account/orders/shared/order.service';

import { CartItem } from '../../models/cart-item.model';
import { Customer } from '../../models/customer.model';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { Shipping } from '../../models/shipping.model';
declare var paypal;
@Component({
  selector: 'app-checkout-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  items: CartItem[];
  itemsNames: string;
  total: number;
  customer: Customer;
  paymentMethod: string;
  shipping: Shipping;
  unsubscribe$ = new Subject();
  user: User;
  product = {
    price: 77.7,
    description: '',
    img: 'assets/co',
  };

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.authService.user.subscribe(user => this.user = user);
    this.items = this.cartService.getItems();
    this.itemsNames = this.cartService.getItemNames();
    this.total = this.cartService.getTotal();

    this.paypalPaymentRender();
    this.cartService.itemsChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();

      });
    this.customer = this.checkoutService.getOrderInProgress().customer;
    this.checkoutService.orderInProgressChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((order: Order) => {
        this.customer = order.customer;
        this.paymentMethod = order.paymentMethod;
        this.shipping = order.shipping;
      });
  }

  paypalPaymentRender() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {

          var totalAmount = this.cartService.getTotalBuilAmount();

          return actions.order.create({
            purchase_units: [
              {
                description: this.itemsNames,
                amount: {
                  currency_code: 'USD',
                  value: totalAmount,
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
          this.onCompleteOrder();
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }




  public onBack() {
    this.checkoutService.previousStep();
  }

  paidFor = false;

  public onCompleteOrder() {

    const userUid = this.user ? this.user.uid : false;
    const order = this.checkoutService.getOrderInProgress();
    const total = this.cartService.getTotal();
    const items = this.cartService.getItems();
    this.checkoutService.setOrderItems(items);

    paypal.Buttons().render


    if (userUid) {
      this.submitUserOrder(order, total, userUid);
    } else {
      this.submitAnonOrder(order, total);
    }
  }






  private submitUserOrder(order, total, userUid) {



    this.orderService
      .addUserOrder(order, total, userUid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.cartService.clearCart();
          this.checkoutService.resetSteps();
          this.router.navigate(['/order-complete']);
        },
        (error) => {
          this.messageService.addError('Could not submit order, try again.');
        }
      );
  }

  private submitAnonOrder(order, total) {
    this.orderService
      .addAnonymousOrder(order, total)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.cartService.clearCart();
          this.checkoutService.resetSteps();
          this.router.navigate(['/order-complete']);
        },
        (error) => {
          this.messageService.addError('Could not submit order, try again.');
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
