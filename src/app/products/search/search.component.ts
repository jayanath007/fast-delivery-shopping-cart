import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  products: any[] =[];
  term$ = new Subject<string>();
  @Input() showSearch: boolean = true; 
  @Output() onHideSearch = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public search(term: string) {

  }

  public onSearchInput(event: any) {

  }

  public onCloseSearch() {

  }

}

