import { CountryCode } from "./countrycode.type";
import { Deserializable } from "./deserializable.abstract";

export class WeatherResponse extends Deserializable {
    id!: number;
    dt!: number;
    cod!: number;
    base!: string;
    name!: string;
    dt_txt?: string;
    timezone?: number;
    visibility!: number;

    sys!: Sys;
    main!: Main;
    wind!: Wind;
    coord!: Coord;
    clouds!: Clouds;
    weather!: Weather[];

    override deserialize(input: any): this {
        super.deserialize(input);

        this.sys = new Sys().deserialize(input.sys);
        this.main = new Main().deserialize(input.main);
        this.wind = new Wind().deserialize(input.wind);
        this.coord = new Coord().deserialize(input.coord);
        this.clouds = new Clouds().deserialize(input.clouds);
        this.weather = input.weather?.forEach((w: any) => new Weather().deserialize(w));

        return this;
    }
}

class Coord extends Deserializable {
    lon!: number;
    lat!: number;
}

class Weather extends Deserializable {
    id!: number;
    main!: string;
    icon!: string;
    description!: string;
}

class Main extends Deserializable {
    temp!: number;
    temp_min!: number;
    temp_max!: number;
    pressure!: number;
    humidity!: number;
    feels_like!: number;
}

class Wind extends Deserializable {
    deg!: number;
    speed!: number;
}

class Clouds extends Deserializable {
    all!: number;
}

class Sys extends Deserializable {
    id!: number;
    type!: number;
    sunset!: number;
    sunrise!: number;
    country!: CountryCode;
}