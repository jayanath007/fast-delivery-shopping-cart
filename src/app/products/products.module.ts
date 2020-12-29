import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from '../shared/shared.module';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListItemComponent } from './products-list-item/products-list-item.component';
import { RatingStarsComponent } from './shared/rating-stars/rating-stars.component';

import { FileUploadService } from './shared/file-upload.service';
import { ProductsCacheService } from './shared/products-cache.service';
import { ProductRatingService } from './shared/product-rating.service';

import { SortPipe } from './shared/sort.pipe';
import { MapModule } from '../map/map.module';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsListComponent,
    ProductsListItemComponent,
    SortPipe,
    RatingStarsComponent,
    ProductsHomeComponent,
    SearchComponent
  ],
  imports: [SharedModule,MapModule,NgbModule,    TimeagoModule.forRoot(), ],
  exports: [
    ProductDetailComponent,
    ProductsListComponent,
    ProductsListItemComponent,
    SortPipe,
    RatingStarsComponent,
    ProductsHomeComponent,
  ],
  providers: [SortPipe, FileUploadService, ProductsCacheService, ProductRatingService]
})
export class ProductsModule {}
