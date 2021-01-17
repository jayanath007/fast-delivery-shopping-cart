import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private productService: ProductService) { }

  model: any;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(400), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      filter(term => !!term),
      switchMap(term => this.productService.findProducts(term)),
      map((data) => {
        return data.map(item => item.name);
      })
    );
  }

  ngOnInit() {
  }

}

