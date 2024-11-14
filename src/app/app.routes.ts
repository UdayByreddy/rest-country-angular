import { Routes } from '@angular/router';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { SingleCountryComponent } from './components/single-country/single-country.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [{
    path:'',component:SelectFieldComponent
},{
    path:'country/:country',component:SingleCountryComponent
},{
    path:'**',component:ErrorPageComponent
}];
