import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllCountry } from './country-interface';

@Injectable({
  providedIn: 'root'
})
export class RestServicesService {

  constructor(private http: HttpClient) {}

  
  getBordersData():Observable<Array<AllCountry>>{
    return this.http.get<any[]>('https://restcountries.com/v3.1/all');
  }

  getAllCountries(): Observable<Array<AllCountry>> {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
      map((result) =>
        
        result.map((country, index) => ({
          id: index,
          name: country.name.common,
          population: country.population,
          Region: country.region,
          Capital: country.capital ? country.capital : ['N/A'],
          flag: country.flags.png,
          area: country.area,
          subregion: country.subregion || 'N/A',
        }) as AllCountry)
      )
    );
  }
  
  
}
