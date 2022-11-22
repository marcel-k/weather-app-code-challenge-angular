import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDayForecastWeatherCardComponent } from './three-day-forecast-weather-card.component';

describe('ThreeDayForecastWeatherCardComponent', () => {
  let component: ThreeDayForecastWeatherCardComponent;
  let fixture: ComponentFixture<ThreeDayForecastWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDayForecastWeatherCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDayForecastWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
