import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RistorantiComponent } from './ristoranti/ristoranti.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RistorantiComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
