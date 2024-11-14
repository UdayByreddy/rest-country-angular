import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core';  
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';  
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';  
import { CommonModule } from '@angular/common';
import { AllCountriesComponent } from '../all-countries/all-countries.component';
import { ToggleService } from '../../toogle-service.service';
@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule, 
    MatOptionModule,  
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    AllCountriesComponent
  ],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.css'
})
export class SelectFieldComponent {



  Inputvalue: string = '';
  Region: string = '';
  Population: string = '';
  Area: string = '';
  Subregion: string = ''; 

  options: string[] = ['All Region', 'Asia', 'Africa', 'Americas', 'Europe', 'Oceania'];
  PopulationOptions: string[] = ['Population Ascending', 'Population Descending'];
  AreaOptions: string[] = ['Area Ascending', 'Area Descending'];
  subRegion: string[] = [];



  handleSubRegions(result: string[]) {
    this.subRegion = result;
  }
}
