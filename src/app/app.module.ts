import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerComponent } from '../app/Component/Beer/beer';
import { CocktailsComponent } from '../app/Component/Cocktails/cocktails';
import { CocktailService } from './Services/cocktail.service';
import { BeerService } from './Services/beer.service';
import { subCategoryComponent } from './Component/Subcategories/subCategory';
import { NotFoundComponent } from './Component/NotFound/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Component/Login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Services/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    BeerComponent,
    CocktailsComponent,
    subCategoryComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [CocktailService, BeerService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
