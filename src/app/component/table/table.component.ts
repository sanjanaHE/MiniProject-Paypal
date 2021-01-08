import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  countries: any = [];
  show: boolean;
  showCurr: boolean;
  showArea: boolean;
  showPopulation: boolean;
  showName: boolean;
  masterCountries: any = [];
  columns;
  direction = false;
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.httpClient.get("assets/data.json").subscribe(data => {
      this.masterCountries = data;
      this.countries = this.masterCountries;
    })
    this.columns = [{ key: 'Flag', val: 'flag' },
    { key: 'Name', val: 'name' },
    { key: 'Total Area', val: 'area' },
    { key: 'Currency', val: 'currencies' },
    { key: 'Region', val: 'region' },
    { key: 'Sub Region', val: 'subregion' },
    { key: 'Population', val: 'population' }]
  }
  //   Use Cases
  // 1. Search by name
  // 2. Search based population < > n (n is number)
  // 3. Search based on area < > n (n is number)
  // 4. Search based on currency
  // 5. Sort based on all fields (Ascending/descending)

  clicked(query) {
    console.log(query);
    this.show = query;
  }
  search(show, value) {
    console.log(show, value)
    // this.filterByValue('ita');
    if (value) {
      if (show === 'name') {
        let newArray = this.masterCountries.filter(country => {
          return country.name.toLowerCase().includes(value.toLowerCase())
        })
        this.countries = newArray
      } else if (show === 'populationL') {
        let newArray = this.masterCountries.filter(country => {
          return country.population < value;
        })
        this.countries = newArray
      } else if (show === 'populationG') {
        let newArray = this.masterCountries.filter(country => {
          return country.population > value;
        })
        this.countries = newArray
      } else if (show === 'areaL') {
        let newArray = this.masterCountries.filter(country => {
          return country.area < value;
        })
        this.countries = newArray
      } else if (show === 'areaG') {
        let newArray = this.masterCountries.filter(country => {
          return country.area > value;
        })
        this.countries = newArray
      } else if (show === 'currency') {
        let newArray = this.masterCountries.filter(country => {
          if (country.currencies[0].code !== null)
            return country.currencies[0].code.toLowerCase().includes(value.toLowerCase())
        })
        this.countries = newArray
        console.log(this.countries)
      }
    }
    else {
      this.countries = this.masterCountries
    }

  }


  sortTable(param) {
    this.direction = !this.direction;
    const compare = (a, b) => {
      if (!a[param] && !b[param]) {
        return 0;
      } else if (a[param] && !b[param]) {
        return -1;
      } else if (!a[param] && b[param]) {
        return 1;
      } else {
        const value1 = a[param].toString().toUpperCase(); // ignore upper and lowercase
        const value2 = b[param].toString().toUpperCase(); // ignore upper and lowercase
        if (value1 < value2) {
          return !this.direction ? -1 : 1;
        } else if (value1 > value2) {
          return !this.direction ? 1 : -1;
        } else {
          return 0;
        }
      }
    };
    return this.countries.sort(compare);
  }
}
