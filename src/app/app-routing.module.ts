import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { BeerComponent } from './Component/Beer/beer';
import { CocktailsComponent } from './Component/Cocktails/cocktails';
import { HomeComponent } from './Component/homePage/home';
import { NotFoundComponent } from './Component/NotFound/not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'beer', component: BeerComponent },
  { path: 'cocktails', component: CocktailsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
