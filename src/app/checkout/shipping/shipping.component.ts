import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../shared/checkout.service';
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
        method: 'Same Day',
        time: 'Same Day',
        fee: 4.99,
        value: 'sameDay'
      },
      {
        method: 'Purolator',
        time: '1 - 3 days',
        fee: 11.99,
        value: 'purolator'
      },
      {
        method: 'UPS',
        time: '2 - 3 days',
        fee: 12.99,
        value: 'ups'
      }
    ];
    this.formShipping = new FormGroup({
      postcode: new FormControl(
        null,
        Validators.required
      ),
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
