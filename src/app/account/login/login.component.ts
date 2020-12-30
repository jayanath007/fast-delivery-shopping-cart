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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    public authenticationService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  
  public onLoginWithGoogle() {
    this.authenticationService.googleLogin().then(
        () => {
          this.messageService.add('Login successful!');
          this.router.navigate(['/home']);
        }
      );
  }
  public onLogin() {
    this.authenticationService
      .emailLogin(this.loginForm.value.email, this.loginForm.value.password)
      .then(
        () => {
          this.messageService.add('Login successful!');
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.code === 'auth/user-not-found') {
            this.loginForm.controls.email.setErrors({ email: true });
          }
          if (error.code === 'auth/wrong-password') {
            this.loginForm.controls.password.setErrors({ password: true });
          }
        }
      );
  }
}
