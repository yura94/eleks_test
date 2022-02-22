import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes , RouterModule} from "@angular/router"
import {HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerComponent} from '../app/Component/Beer/beer';
import { CocktailsComponent} from '../app/Component/Cocktails/cocktails';
import { HomeComponent} from '../app/Component/homePage/home';

const appRoutes : Routes = [
  {path: "", component : HomeComponent},
  {path: "beer", component : BeerComponent},
  {path: "cocktails", component : CocktailsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    BeerComponent,
    CocktailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
