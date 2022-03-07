import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerComponent } from '../app/Component/Beer/beer';
import { CocktailsComponent } from '../app/Component/Cocktails/cocktails';
import { HomeComponent } from '../app/Component/homePage/home';
import { CocktailService } from './Services/cocktail.service';
import { BeerService } from './Services/beer.service';
import { subCategoryComponent } from './Component/Subcategories/subCategory';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'beer', component: BeerComponent },
  { path: 'cocktails', component: CocktailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BeerComponent,
    CocktailsComponent,
    subCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [CocktailService, BeerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
