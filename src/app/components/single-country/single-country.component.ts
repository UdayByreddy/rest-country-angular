import { Component, OnInit, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { RestServicesService } from '../../rest-services.service';
import { ActivatedRoute } from '@angular/router';
import { SingleCountry } from '../../country-interface';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-single-country',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SingleCountryComponent implements OnInit {

  
  countryName: string | null = '';
  country: SingleCountry | null = null;
  allCountriesData: any[] = [];
  isLoading: boolean = false; 

  constructor(private services: RestServicesService, private route: ActivatedRoute) {}


 


  private getAllCountriesData(): Observable<any[]> {
    return this.services.getBordersData().pipe(
      map((result) => result || []),
      catchError((err) => {
        console.error('Error fetching borders data:', err);
        return of([]);
      })
    );
  }

  private transformCountryData(country: any): SingleCountry {
    const codeNames = this.allCountriesData.reduce((acc: { [key: string]: { name: string, index: number } }, c, index) => {
      acc[c.cca3] = { name: c.name.common, index };
      return acc;
    }, {});
  
    const bordersMap = this.allCountriesData.reduce((acc, c) => {
      if (c.borders && Array.isArray(c.borders)) {
        acc[c.cca3] = c.borders
          .map((border: string | number) => (codeNames[border] ? [codeNames[border].name, codeNames[border].index] : null))
          .filter(Boolean);
      } else {
        acc[c.cca3] = [];
      }
      return acc;
    }, {});
  
    return {
      id: 1,
      name: country.name.common,
      flag: country.flags?.png || 'N/A',
      nativeName: country.name.nativeName.common,
      population: country.population,
      Region: country.region,
      Capital: country.capital?.[0] || 'N/A',
      subregion: country.subregion || 'N/A',
      continents: country.continents?.join(', ') || 'N/A',
      tld: country.tld?.[0] || 'N/A',
      currencies: country.currencies ? 
      Object.values(country.currencies).map((currency: any) => currency.name).join(', ') || 'N/A' 
      : 'N/A',
      languages: country.languages ? 
                 Object.values(country.languages).join(', ') 
                 : 'N/A',
      area: country.area,
      borders: bordersMap[country.cca3] || [],
      cca3: country.cca3,
    };
  }

  ngOnInit(): void {

    this.isLoading=true;
   
    this.route.params.subscribe((params) => {
      this.countryName = params['country'];  
      
     
      this.getAllCountriesData().subscribe({
        next: (result) => {
          this.allCountriesData = result;
          if (this.countryName) {
            const rawCountry = this.allCountriesData.find((c) => c.name.common === this.countryName);
            if (rawCountry) {
              this.country = this.transformCountryData(rawCountry);  
            }
          }
        },
        error: (err) => {
          console.error('Error fetching countries data:', err);
        }
      });
    });
  }
  



  
  
}
