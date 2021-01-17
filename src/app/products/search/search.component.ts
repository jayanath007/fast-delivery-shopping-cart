import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private productService: ProductService ,private router: Router) { }

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
        console.log(data);
        return data.map(item => { return { name: item.name, id: item.id } });
      })
    );
  }

  searchSelect(event){
     this.router.navigate(['/products/'+ event.item.id ]);
  }

  formatter = (x: {name: string}) => x.name;

  ngOnInit() {
  }

}

