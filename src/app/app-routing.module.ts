import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './Component/Login/login.component';
import { BeerComponent } from './Component/Beer/beer';
import { CocktailsComponent } from './Component/Cocktails/cocktails';
import { HomeComponent } from './Component/homePage/home';
import { NotFoundComponent } from './Component/NotFound/not-found.component';
import { AuthGuard } from './auth.guard';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'beer', 
    component: BeerComponent ,
    canActivate : [AuthGuard]},
  { path: 'cocktails',
    component: CocktailsComponent ,
    canActivate : [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'signIn', component: LoginComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
