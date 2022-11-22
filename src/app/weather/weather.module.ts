import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { CurrentWeatherCardComponent } from './current-weather-card/current-weather-card.component';
import { DayForecastWeatherCardComponent } from './day-forecast-weather-card/day-forecast-weather-card.component';
import { ThreeDayForecastWeatherCardComponent } from './three-day-forecast-weather-card/three-day-forecast-weather-card.component';


@NgModule({
  declarations: [
    WeatherComponent,
    CurrentWeatherCardComponent,
    DayForecastWeatherCardComponent,
    ThreeDayForecastWeatherCardComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
