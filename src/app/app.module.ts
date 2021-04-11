import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RistorantiComponent } from './ristoranti/ristoranti.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AppPromoteComponent } from './app-promote/app-promote.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  overlayColor: "rgba(255,255,255,0.90",
  fgsColor: '#b83d0f',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 120,
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbColor: '#b83d0f',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 6, // progress bar thickness
};



@NgModule({
  declarations: [
    AppComponent,
    RistorantiComponent,
    SearchbarComponent,
    AppPromoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
