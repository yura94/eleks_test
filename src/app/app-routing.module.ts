import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { BeersComponent } from './components/beers/beers.component';
import { CocktailsComponent } from './components/cocktails/cocktails';
import { HomeComponent } from './components/homePage/home-page.component';
import { NotFoundComponent } from './components/notFound/not-found.component';
import { AuthGuard } from './auth.guard';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { BeerItemComponent } from './components/beer-item/beer-item.component';
import { CocktailItemComponent } from './components/cocktail-item/cocktails-item.component';
import { BeerBuilderDropDownComponent } from './components/beer-builder-dropDown/beer-builder-dropDown.component';
import { BeerAutoCompleteComponent } from './components/beer-auto-complete/beer-auto-complete.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'beer', component: BeersComponent, canActivate: [AuthGuard] },
      { path: 'beer/categoryes/:category', component: BeersComponent },
      { path: 'beer/builder', component: BeerBuilderDropDownComponent },
      { path: 'beer/autoComplete', component: BeerAutoCompleteComponent },
      { path: 'beer/:id', component: BeerItemComponent },
      {
        path: 'cocktails',
        component: CocktailsComponent,
        canActivate: [AuthGuard],
      },

      { path: 'cocktails/categoryes/:category', component: CocktailsComponent },
      { path: 'cocktails/:id', component: CocktailItemComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'signIn', component: LoginComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
