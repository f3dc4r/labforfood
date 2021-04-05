import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPromoteComponent } from './app-promote/app-promote.component';
import { RistorantiComponent } from './ristoranti/ristoranti.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

const routes: Routes = [{path : "", component : AppPromoteComponent},
{path : "ristoranti", component : RistorantiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
