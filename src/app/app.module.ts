import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeersComponent } from './components/beers/beers.component';
import { CocktailsComponent } from './components/cocktails/cocktails';
import { CocktailService } from './services/cocktail.service';
import { BeerService } from './services/beer.service';
import { SubCategoryComponent } from './components/subcategories/sub-category.component';
import { NotFoundComponent } from './components/notFound/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { NavBarComponent } from './components/navBar/nav-bar.component';
import { HomeComponent } from './components/homePage/home-page.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BeerItemComponent } from './components/beer-item/beer-item.component';
import { CocktailItemComponent } from './components/cocktail-item/cocktails-item.component';
import { AgGridModule } from 'ag-grid-angular';
import { PictureCellRendererComponent } from './components/ag-grid/picture-cell-renderer.component';
import { NameCocktailCellRendererComponent } from './components/ag-grid/name-cocktail-cell-renderer.component';
import { FailInterceptor } from './interceptors/fail.interceptor';
import { MaltBeerCellRendererComponent } from './components/ag-grid/malt-beer-cell-renderer.component';
import { BeerBuilderDropDownComponent } from './components/beer-builder-dropDown/beer-builder-dropDown.component';
import { BeerAutoCompleteComponent } from './components/beer-auto-complete/beer-auto-complete.component';
import { NavBarPipe } from './pipes/nav-bar.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BeersComponent,
    CocktailsComponent,
    SubCategoryComponent,
    NotFoundComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    WrapperComponent,
    CategoryListComponent,
    BeerItemComponent,
    CocktailItemComponent,
    PictureCellRendererComponent,
    NameCocktailCellRendererComponent,
    MaltBeerCellRendererComponent,
    BeerBuilderDropDownComponent,
    BeerAutoCompleteComponent,
    NavBarPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    AgGridModule.withComponents([
      PictureCellRendererComponent,
      NameCocktailCellRendererComponent,
      MaltBeerCellRendererComponent,
    ]),
  ],
  providers: [
    CocktailService,
    BeerService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: FailInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
