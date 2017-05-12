import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { EsriLoaderService } from 'angular2-esri-loader';
import { Angular2Esri4Module } from 'angular2-esri4-components';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustomFormsModule } from 'ng2-validation';
import { ToasterModule } from 'angular2-toaster';

import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';
import { DonorComponent} from './donor/donor.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DonorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    CommonModule,
    Angular2Esri4Module,
    Ng2Bs3ModalModule,
    ToasterModule,
    SDKBrowserModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [EsriLoaderService],
  bootstrap: [AppComponent]
})

export class AppModule { }
