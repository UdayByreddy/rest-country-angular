import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [MatButtonModule,RouterModule,MatIcon,MatCard],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ErrorPageComponent {

}
