import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerComponent } from '../app/Component/Beer/beer';
import { CocktailsComponent } from '../app/Component/Cocktails/cocktails';
import { HomeComponent } from '../app/Component/homePage/home';
import { CocktailService } from './Services/cocktail.service';
import { BeerService } from './Services/beer.service';
import { subCategoryComponent } from './Component/Subcategories/subCategory';
import { NotFoundComponent } from './Component/NotFound/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    BeerComponent,
    CocktailsComponent,
    subCategoryComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CocktailService, BeerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
