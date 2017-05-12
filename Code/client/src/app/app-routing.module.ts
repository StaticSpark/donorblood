import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { DonorComponent} from './donor/donor.component';

const APP_ROUTES: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'donor/:id', component: DonorComponent },
  { path: '**', redirectTo: 'map' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }