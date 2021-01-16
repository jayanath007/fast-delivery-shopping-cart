import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent  implements OnInit {

  public registerForm: FormGroup;
  public registerErrors: string;

  constructor(
    public authenticationService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initRegisterForm();
  }



  private initRegisterForm() {



    
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      role: new FormControl("buyer", Validators.required),
      subscription: new FormControl("free", Validators.required),
    });
  }

  public onRegister() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.registerErrors = 'Passwords don\'t match!';
      this.registerForm.controls.password.setErrors({ password: true });
      this.registerForm.controls.confirmPassword.setErrors({ confirmPassword: true });
    } else {

      this.authenticationService.newUserSignUp(this.registerForm.value)
      .then(
        () => {
          this.messageService.add('Account created successfully. Please login with your new credentials!');
          this.router.navigate(['/login']);
          this.initRegisterForm();
        },
        (error) => {
          this.registerErrors = error.message;
          if (error.code === 'auth/weak-password') {
            this.registerForm.controls.password.setErrors({ password: true });
            this.registerForm.controls.confirmPassword.setErrors({ confirmPassword: true });
          }
          if (error.code === 'auth/email-already-in-use') {
            this.registerForm.controls.email.setErrors({ email: true });
          }
        }
      );
    }
  }

}
