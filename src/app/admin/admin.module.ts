import { NgModule } from '@angular/core';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AddEditComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ProductsModule,
        NgbModule,
    ],
    exports: [
        ProductsModule,
    ]
})
export class AdminModule {}
