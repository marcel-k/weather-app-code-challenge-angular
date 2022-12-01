import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { WeatherLocationModel, WeatherModel } from './weather.model';
import { WeatherResponse } from './weather.response';
import { mockJson } from './weather.service.mock';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _selectedLocation!: WeatherLocationModel;
  private _weather: BehaviorSubject<WeatherModel[]> = new BehaviorSubject(<WeatherModel[]>[]);
  public readonly weather$: Observable<WeatherModel[]> = this._weather.asObservable();

  get selectedLocation() { return this._selectedLocation; }
  set selectedLocation(location: WeatherLocationModel) {
    this.selectedLocation = location;
    
    this.getWeatherDataMock();
    // this.getWeatherData();
  }

  constructor(private http: HttpClient) { }

  private getWeatherDataMock() {
    const json = mockJson;
    const response = this.mapJsonToResponse(json.list);
    const model = this.mapResponseToModel(response);

    this._weather.next(model);
  }

  private getWeatherData() {
    const httpParams = new HttpParams(
      {
        fromObject:
        {
          appid: '', //apiKey,
          units: 'metric',
          q: `${this.selectedLocation.cityName},${this.selectedLocation.countryCode}`,
        }
      }
    );

    this.http.get<{ list: any[] }>('apiUrlFromConfig', { params: httpParams })
      .pipe(
        map(({ list }) => this.mapJsonToResponse(list)),
        map(this.mapResponseToModel),
        // catchError(this.handleError)
      )
      .subscribe((model) => this._weather.next(model));
      //TODO: unsubscribe? (wat gebeurt er als location heel snel achter elkaar wisselt), shareReplay?
  }


  private mapJsonToResponse(list: any[]): WeatherResponse[] {
    const response = list.map((item: any) => new WeatherResponse().deserialize(item));

    return response;
  }

  private mapResponseToModel(response: WeatherResponse[]): WeatherModel[] {
    const models = response.map((response) => new WeatherModel().mapResponse(response));

    return models;
  }
}
