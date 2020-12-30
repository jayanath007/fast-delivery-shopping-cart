import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {


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
      },
      err => {
        console.log(err);
        debugger
        // handle errors
      }
    );
  }

}
