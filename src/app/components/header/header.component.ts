
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ToggleService } from '../../toogle-service.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  toggleState: boolean = false;

  constructor(private toggleService:ToggleService ){}

  ngOnInit() {
    
    this.toggleService.toggleState.subscribe(state => {
      this.toggleState = state;
    });
  }


  toggleMode() {
   this.toggleService.toggle();
   document.body.style.backgroundColor = this.toggleState ? '#2D3A47' : '#ffffff'; 
    document.body.classList.toggle('dark-theme',this.toggleState ); 
  }
}
