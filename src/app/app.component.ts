import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  state = [] ||localStorage.getItem('state');
  takeCryptData() {
    localStorage.setItem("state", "11"); 
    fetch('https://api.punkapi.com/v2/beers/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("state", data); 
        this.state = data;
        console.log(data);
      });
  }

  takeMenuData() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("state", data); 
        this.state = data;
        console.log(data);
      });
  }
}
