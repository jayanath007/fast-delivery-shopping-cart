import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { EmailConfirmationComponent } from './password-reset/email-confirmation/email-confirmation.component';
import { PasswordResetRequestComponent } from './password-reset/password-reset-request/password-reset-request.component';
import { ConfirmPasswordResetComponent } from './password-reset/confirm-password-reset/confirm-password-reset.component';
import { ConfirmEmailAddressComponent } from './password-reset/confirm-email-address/confirm-email-address.component';

@NgModule({
    declarations: [
        AccountComponent,
        ProfileComponent,
        OrdersComponent,
        RegisterLoginComponent,
        LoginComponent,
        UserRegistrationComponent,
        EmailConfirmationComponent,
        PasswordResetRequestComponent,
        ConfirmPasswordResetComponent,
        ConfirmEmailAddressComponent,
        
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SharedModule
    ]
})
export class AccountModule {}
