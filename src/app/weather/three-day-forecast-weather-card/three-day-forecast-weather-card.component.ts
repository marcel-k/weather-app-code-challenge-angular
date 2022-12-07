import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { WeatherLocationModel, WeatherModel } from 'src/app/core/services/weather/weather.model';
import { WeatherService } from 'src/app/core/services/weather/weather.service';
import { BarChartModel } from 'src/app/shared/components/bar-chart/bar-chart.model';

@Component({
  selector: 'wa-three-day-forecast-weather-card',
  templateUrl: './three-day-forecast-weather-card.component.html',
  styleUrls: ['./three-day-forecast-weather-card.component.css']
})
export class ThreeDayForecastWeatherCardComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: true, read: ElementRef }) contentViewChild!: ElementRef<Element>;
  
  chartData!: BarChartModel;
  weatherSub!: Subscription;

  constructor(private weatherService: WeatherService) {
  
  }
 
  ngOnInit(): void {
    this.weatherSub = this.weatherService.threeDayWeatherForecast$
      .pipe(map(this.mapWeatherToBarChartModel))
      .subscribe((data) => {
        this.chartData = data;
      });
  }

  ngOnDestroy(): void {
    this.weatherSub.unsubscribe();
  }

  mapWeatherToBarChartModel(weatherModel: WeatherModel[]): BarChartModel {
    const formattedData = weatherModel.reduce((previous, weatherItem) => {
      const { date, humidity, temperature } = weatherItem;
      const label = date.toISOString();
      return {
        humidity: [...previous.humidity, { label, value: humidity }],
        temperature: [...previous.temperature, { label, value: temperature }]
      };
    }, { humidity: [], temperature: [] } as BarChartModel);

    return formattedData;
  }
}
