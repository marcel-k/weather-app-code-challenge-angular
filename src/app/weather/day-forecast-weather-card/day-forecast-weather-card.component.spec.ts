import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayForecastWeatherCardComponent } from './day-forecast-weather-card.component';

describe('DayForecastWeatherCardComponent', () => {
  let component: DayForecastWeatherCardComponent;
  let fixture: ComponentFixture<DayForecastWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayForecastWeatherCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayForecastWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
