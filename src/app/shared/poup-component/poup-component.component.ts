import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-poup-component',
  templateUrl: './poup-component.component.html',
  styleUrls: ['./poup-component.component.scss']
})
export class PoupComponentComponent implements OnInit {

  @Input() name;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
  }

}
