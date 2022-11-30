import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '../shared/shared.module';
import { CurrentWeatherCardComponent } from './current-weather-card/current-weather-card.component';
import { DayForecastWeatherCardComponent } from './day-forecast-weather-card/day-forecast-weather-card.component';
import {
  ThreeDayForecastWeatherCardComponent,
} from './three-day-forecast-weather-card/three-day-forecast-weather-card.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';


@NgModule({
  declarations: [
    WeatherComponent,
    CurrentWeatherCardComponent,
    DayForecastWeatherCardComponent,
    ThreeDayForecastWeatherCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WeatherRoutingModule,
    MatCardModule
  ]
})
export class WeatherModule { }
