import { CountryCode } from './countrycode.type';
import { Deserializable } from './deserializable.abstract';
import { WeatherResponse } from './weather.response';

export class WeatherLocationModel extends Deserializable {
    
    constructor(public cityName: string, public countryCode: CountryCode) {
        super();
    }
}
export class WeatherModel extends Deserializable {
    date!: Date;
    main!: string;
    humidity!: number;
    temperature!: number;
    description!: string;
    minTemperature!: number;
    maxTemperature!: number;

    override deserialize(input: any): this {
        super.deserialize(input);
        this.date = new Date(input.dt_txt?.replace(/-/g, '/') as string);

        return this;
    }

    /**
     * Take a WeatherResponse object and map it to the properties of this model.
     * Existing property values will be overriden
     * @param weatherResponse 
     * @returns 
     */
    mapResponse(weatherResponse: WeatherResponse): this {
        const {
            main,
            dt_txt,
            weather,
        } = weatherResponse;

        this.main = weather[0].main;
        this.temperature = Math.round(main.temp);
        this.humidity = Math.round(main.humidity);
        this.description = weather[0].description;
        this.minTemperature = Math.round(main.temp_min);
        this.maxTemperature = Math.round(main.temp_max);
        this.date = new Date(dt_txt?.replace(/-/g, '/') as string);

        return this;
    }
}