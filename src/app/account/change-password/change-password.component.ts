
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../shared/auth.service';

import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  public formProfile: FormGroup;
  public profileErrors: string;
  private user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initFormGroup();
    this.authSubscription = this.authService.user.subscribe(
      user => {
        if (user) {
          this.user = user;
        }
      }
    );
  }

  private initFormGroup() {
    this.formProfile = new FormGroup({
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    });
  }

  public onSubmit() {

    if (this.formProfile.value.password !== this.formProfile.value.confirmPassword) {
      this.profileErrors = 'Passwords don\'t match!';
      this.formProfile.controls.password.setErrors({ password: true });
      this.formProfile.controls.confirmPassword.setErrors({ confirmPassword: true });
    } else {

      // Update password
      if (this.formProfile.value.password && this.formProfile.value.confirmPassword
        && (this.formProfile.value.password === this.formProfile.value.confirmPassword)) {
        this.authService.updatePassword(this.formProfile.value.password)
          .catch(
            error => {
              this.profileErrors = error.message;
            }
          );
      }

    }

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
