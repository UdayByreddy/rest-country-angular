import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCountryComponent } from './single-country.component';

describe('SingleCountryComponent', () => {
  let component: SingleCountryComponent;
  let fixture: ComponentFixture<SingleCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
