import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseErrors } from '../FirebaseErrors';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.scss']
})
export class ConfirmPasswordResetComponent implements OnInit {

  frmSetNewPassword = this.fb.group({
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  });

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  setPassword() {
    const password = this.frmSetNewPassword.controls['password'].value;
    const confirmPassword = this.frmSetNewPassword.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      // react to error
      return;
    }
    const code = this.route.snapshot.queryParams['oobCode'];
    this.afAuth.auth
    .confirmPasswordReset(code, password)
    .then(() => this.router.navigate(['signin']))
    .catch(err => {
     const errorMessage = FirebaseErrors.Parse(err.code); // check this helper class at the bottom
    });

  }

}
