import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {

  mode = this.activatedActivated.snapshot.queryParams['mode'];

  constructor(private activatedActivated: ActivatedRoute) {}

  ngOnInit() {
  }

}
