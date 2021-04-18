import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPromoteComponent } from './app-promote/app-promote.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { DettaglioMenuComponent } from './dettaglio-menu/dettaglio-menu.component';
import { DettaglioOrdiniComponent } from './dettaglio-ordini/dettaglio-ordini.component';
import { OrdiniUtenteComponent } from './ordini-utente/ordini-utente.component';
import { RistorantiComponent } from './ristoranti/ristoranti.component';

const routes: Routes = [{path : "", component : AppPromoteComponent},
{path : "ristoranti", component : RistorantiComponent},
{path : "area-riservata", component : AreaRiservataComponent},
{path : "ordini-utente", component : OrdiniUtenteComponent},
{path : "dettaglio-ordini", component : DettaglioOrdiniComponent},
{path : "dettaglio-menu", component : DettaglioMenuComponent},
{path : "carrello", component : CarrelloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
