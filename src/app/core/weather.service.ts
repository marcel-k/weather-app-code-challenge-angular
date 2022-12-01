import { Injectable } from '@angular/core';
import { WeatherModel } from './weather.model';
import { WeatherResponse } from './weather.response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }


  private mapJsonToResponse(json: any): WeatherResponse[] {
    const response = json.map((item: any) => new WeatherResponse().deserialize(item));

    return response;
  }

  private mapResponseToModel(response: WeatherResponse): WeatherModel {
    const model = new WeatherModel().mapResponse(response);

    return model;
  }
}
