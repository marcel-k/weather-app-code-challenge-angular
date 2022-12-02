import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, shareReplay, switchMap } from 'rxjs';

import { WeatherLocationModel, WeatherModel } from './weather.model';
import { WeatherResponse } from './weather.response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _selectedLocation!: WeatherLocationModel;
  get selectedLocation() { return this._selectedLocation; }
  set selectedLocation(location: WeatherLocationModel) {
    this._selectedLocation = location;

    this._weatherForecast.next();
  }

  // _weatherForecast Subject is manually triggered (with next()) when selectedLocation changes.
  // When next is fired, getWeatherData is automatically called through the switchMap operator.
  // shareReplay(1) makes sure every call is done only once, even though multiple components are subscribed.
  private _weatherForecast = new ReplaySubject<void>();
  public readonly weatherForecast$: Observable<WeatherModel[]> = this._weatherForecast.pipe(
    switchMap(() => this.getWeatherForecast()),
    shareReplay(1),
  );

  constructor(private http: HttpClient) { }

/**
 * Get weather forecast data based on the selected location.
 * @private subscribe to weatherForecast$ instead to get forecast data.
 */
  private getWeatherForecast() {
    const httpParams = new HttpParams(
      {
        fromObject:
        {
          appid: 'f5f602b5811d444692ab37bbeee62b23',
          units: 'metric',
          q: `${this.selectedLocation.cityName},${this.selectedLocation.countryCode}`,
        }
      }
    );

    return this.http.get('https://api.openweathermap.org/data/2.5/forecast', { params: httpParams })
      .pipe(
        map((data: any) => { return data.list }),
        map((list) => this.mapJsonToResponse(list)),
        map(this.mapResponseToModel)
        // catchError(this.handleError)
      )
  }


  private mapJsonToResponse(list: any[]): WeatherResponse[] {
    const response = list.map((item: any) => new WeatherResponse().deserialize(item));

    return response;
  }

  private mapResponseToModel(response: WeatherResponse[]): WeatherModel[] {
    const models = response.map((response) => new WeatherModel().mapResponse(response));

    return models;
  }

  // private getWeatherForecastMock() {
  //   const json = mockJson;
  //   const response = this.mapJsonToResponse(json.list);
  //   const model = this.mapResponseToModel(response);

  //   return new Observable<WeatherModel[]>((subscriber) => subscriber.next(model));
  // }
}
