import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '../../models/order.model';
import { Customer } from '../../models/customer.model';
import { CartItem } from '../../models/cart-item.model';
import { Shipping } from '../../models/shipping.model';

@Injectable()
export class CheckoutService {
  private orderInProgress: Order;
  public orderInProgressChanged: EventEmitter<Order> = new EventEmitter<Order>();
  public stepChanged: EventEmitter<number> = new EventEmitter<number>();
  public activeStep: number;

  constructor() {
    this.orderInProgress = new Order(new Customer());
    this.activeStep = 0;
  }

  public gotoStep(number) {
    this.activeStep = number;
    this.stepChanged.emit(this.activeStep);
  }

  public nextStep() {
    this.activeStep++;
    this.stepChanged.emit(this.activeStep);
  }

  previousStep() {
    this.activeStep--;
    this.stepChanged.emit(this.activeStep);
  }

  public resetSteps() {
    this.activeStep = 0;
  }

  public setCustomer(customer: Customer) {
    this.orderInProgress.customer = customer;
    this.orderInProgressChanged.emit(this.orderInProgress);
  }

  public setShippingMethod(item) {
    this.orderInProgress.shippingMethod = item.shippingMethod;
    this.orderInProgress.deliveryDate = item.deliveryDate;
    this.orderInProgress.deliveryTime = item.deliveryTime;

    this.orderInProgressChanged.emit(this.orderInProgress);
  }

  public setShipping(shipping: Shipping) {
    this.orderInProgress.shipping = shipping;
    this.orderInProgressChanged.emit(this.orderInProgress);
  }

  public setOrderItems(items: CartItem[]) {
    this.orderInProgress.items = items;
    this.orderInProgressChanged.emit(this.orderInProgress);
  }

  public getOrderInProgress() {
    return this.orderInProgress;
  }

  public setPaymentMethod(paymentMethod: string) {
    this.orderInProgress.paymentMethod = paymentMethod;
    this.orderInProgressChanged.emit(this.orderInProgress);
  }
}
