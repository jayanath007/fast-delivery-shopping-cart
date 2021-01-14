import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { PriceComponent } from './price/price.component';
import { PageTitleComponent } from '../core/page-title/page-title.component';
import { PoupComponentComponent } from './poup-component/poup-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        PriceComponent,
        PageTitleComponent,
        PoupComponentComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule
    ],
    entryComponents: [PoupComponentComponent],
    exports: [
        PriceComponent,
        PageTitleComponent,
        PoupComponentComponent,
        CommonModule,
        AppRoutingModule,
        FormsModule,
  
    ]
})
export class SharedModule {}
