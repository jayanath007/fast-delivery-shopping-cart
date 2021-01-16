import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../shared/checkout.service';
import { Customer } from '../../models/customer.model';
import { CartService } from '../../cart/shared/cart.service';

@Component({
  selector: 'app-checkout-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  public formShipping: FormGroup;
  public shippingMethods: { method: string, time: string, fee: number, value: string }[];

  constructor(private checkoutService: CheckoutService, 
    private cartService: CartService) { }

  ngOnInit() {
    this.shippingMethods = [
      {
        method: 'Same Day Delevery',
        time: '0 - 1 days',
        fee: 11,
        value: 'priority'
      },
      {
        method: 'Nomal Post Delevery',
        time: 'up to one week',
        fee: 9,
        value: 'economy'
      }
    ];
    this.formShipping = new FormGroup({
      'shippingMethod': new FormControl(this.shippingMethods[1].value, Validators.required)
    });
  }

  public onBack() {
    this.checkoutService.previousStep();
  }

  public onContinue() {
    this.checkoutService.setShippingMethod(this.formShipping.controls.shippingMethod.value);
    var item = this.shippingMethods.filter(p => p.value == this.formShipping.controls.shippingMethod.value)[0];
    this.cartService.setShippingAmount(item.fee);
    this.checkoutService.setShipping(item);
    this.checkoutService.nextStep();
  }

}
