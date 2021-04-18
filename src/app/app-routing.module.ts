import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPromoteComponent } from './app-promote/app-promote.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { RistorantiComponent } from './ristoranti/ristoranti.component';

const routes: Routes = [{path : "", component : AppPromoteComponent},
{path : "ristoranti", component : RistorantiComponent},
{path : "area-riservata", component : AreaRiservataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
