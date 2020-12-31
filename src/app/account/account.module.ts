import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { EmailConfirmationComponent } from './password-reset/email-confirmation/email-confirmation.component';
import { ConfirmPasswordResetComponent } from './password-reset/confirm-password-reset/confirm-password-reset.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AccountComponent,
        ProfileComponent,
        OrdersComponent,
        RegisterLoginComponent, 
        LoginComponent,
        UserRegistrationComponent,
        EmailConfirmationComponent,
        ConfirmPasswordResetComponent,
        ChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [
        SharedModule
    ]
})
export class AccountModule {}
