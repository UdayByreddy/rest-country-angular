import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RestServicesService } from '../../rest-services.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AllCountry } from '../../country-interface';
import { ToggleService } from '../../toogle-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-all-countries',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule,RouterModule,MatProgressSpinnerModule],
  templateUrl: './all-countries.component.html',
  styleUrl: './all-countries.component.css'
})
export class AllCountriesComponent {

  @Input() input: string = '';
  @Input() selectRegion: string = '';
  @Input() selectPopulation: string = '';
  @Input() selectArea: string = '';
  @Input() selectSubRegion: string = '';  
  @Output() subRegionsArray = new EventEmitter<string[]>();

  cols: number = 4;
  countries: Array<AllCountry> = [];
  filteredCountries: Array<AllCountry> = [];
  subRegion: Array<string> = [];
  toggleState: boolean = false;
  isLoading:boolean=false;


  constructor(private service: RestServicesService, private breakpointObserver: BreakpointObserver,private toggleService:ToggleService) {}


  ngOnInit() {

    this.toggleService.toggleState.subscribe(state => {
      this.toggleState = state;
    });

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = 3;
        } else {
          this.cols = 4;
        }
      }
    });

    this.service.getAllCountries().subscribe((result) => {
      this.countries = result;
      this.filteredCountries = result;
    });
  }

  ngOnChanges() {
    this.isLoading=true;
    this.filteredCountriesData();
    if (this.selectRegion) {
      this.subRegionsFunction();
    }
  }

  private filteredCountriesData() {
    this.filteredCountries = [...this.countries];
    
    if (this.input) {
      this.filteredCountries = this.filteredCountries.filter((country) => 
        country.name.toLowerCase().includes(this.input.toLowerCase())
      );
    }

    if (this.selectRegion && this.selectRegion!=='All Region') {
      this.filteredCountries = this.filteredCountries.filter((country) =>
        country.Region.toLowerCase() === this.selectRegion.toLowerCase()
      );
    }

    if (this.selectPopulation) {
      this.filteredCountries.sort((a, b) => 
        this.selectPopulation === 'Population Ascending' ? a.population - b.population : b.population - a.population
      );
    }

    if (this.selectArea) {
      this.filteredCountries.sort((a, b) => 
        this.selectArea === 'Area Ascending' ? a.area - b.area : b.area - a.area
      );
    }

    if (this.selectSubRegion) {
      console.log(this.selectSubRegion);
      this.filteredCountries = this.filteredCountries.filter((country) =>
        country.name.toLowerCase().includes(this.selectSubRegion.toLowerCase())
      );
    }
  }

  private subRegionsFunction() {
    this.subRegion = this.countries
      .filter((country) => country.Region === this.selectRegion)
      .map((country) => country.name)
      .filter((value, index, self) => self.indexOf(value) === index);

    this.subRegionsArray.emit(this.subRegion);
  }
}
