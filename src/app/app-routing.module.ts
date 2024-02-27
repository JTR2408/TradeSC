import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShipsComponent } from './ships/ships.component';
import { CommoditiesComponent } from './commodities/commodities.component';
import { TradeComponent } from './trade/trade.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ships', component: ShipsComponent },
  { path: 'commodities', component: CommoditiesComponent },
  { path: 'trade', component: TradeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
