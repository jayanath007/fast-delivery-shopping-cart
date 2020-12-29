import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey,
    }),
  ],
  exports:[MapComponent],
  declarations: [MapComponent]
})
export class MapModule { }
