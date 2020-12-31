import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { OrderService } from './orders/shared/order.service';

import { User } from '../models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  public user: User;
  private authSubscription: Subscription;
  @ViewChild('photos', { static: true }) photos;

  constructor(
    private authService: AuthService,
    public router: Router,
    public orderService: OrderService
  ) { }


  onFileSelected() {
    const files: FileList = this.photos.nativeElement.files;
    this.authService.updateUserImage( this.user, files );
  }



  ngOnInit() {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
