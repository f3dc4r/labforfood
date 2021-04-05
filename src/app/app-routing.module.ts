import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RistorantiComponent } from './ristoranti/ristoranti.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

const routes: Routes = [{path : "", component : SearchbarComponent},
{path : "ristoranti", component : RistorantiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
