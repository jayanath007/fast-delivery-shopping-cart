import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseErrors } from '../FirebaseErrors';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {


  verificationCodeSendMessage ="";
  errorMessage ="";

  frmPasswordReset: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  });

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit() {
  }

  SendPasswordResetRequest(){
    const email = this.frmPasswordReset.controls['email'].value;
    this.afAuth.auth.sendPasswordResetEmail(email).then(
      (success) => {
        // success, show some message
        console.log(success);
        this.verificationCodeSendMessage = "We send a change password link to your email address. please use this link to change your password ";
      },
      err => {
         this.errorMessage = FirebaseErrors.Parse(err.code); 
         this.verificationCodeSendMessage ="";
        console.log(err);
        // handle errors
      }
    );
  }

}
