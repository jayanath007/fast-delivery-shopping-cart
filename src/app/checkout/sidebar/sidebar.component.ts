import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from '../../cart/shared/cart.service';
import { Order } from '../../models/order.model';
import { Shipping } from '../../models/shipping.model';
import { CheckoutService } from '../shared/checkout.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-checkout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit , OnDestroy {
  public cartSubtotal: number;
  public orderTotal: number;
  public shippingFee: number;
  unsubscribe$ = new Subject();
  
  constructor(private cartService: CartService,   
    private checkoutService: CheckoutService,) { }

  ngOnInit() {

    this.cartSubtotal = this.cartService.getTotal();
    this.orderTotal = this.cartService.getTotalBuilAmount();
    
    this.checkoutService.orderInProgressChanged
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((order: Order) => {
      this.shippingFee = (order && order.shipping && order.shipping.fee) ? order.shipping.fee : 0;
      this.orderTotal =  this.shippingFee +  this.cartSubtotal;
    });
   
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
