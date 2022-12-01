import { Component } from '@angular/core';
import { WeatherModel } from 'src/app/core/weather.model';
import { BarChartModel } from 'src/app/shared/components/bar-chart/bar-chart.model';

@Component({
  selector: 'wa-three-day-forecast-weather-card',
  templateUrl: './three-day-forecast-weather-card.component.html',
  styleUrls: ['./three-day-forecast-weather-card.component.css']
})
export class ThreeDayForecastWeatherCardComponent {

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
