
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  
  private _toggleState$ = new BehaviorSubject<boolean>(false); 
  toggleState = this._toggleState$.asObservable(); 

  toggle() {
    this._toggleState$.next(!this._toggleState$.value);
  }
}
