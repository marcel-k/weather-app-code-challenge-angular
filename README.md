onderdelen te bouwen in de angular versie:

- x angular updaten naar 15
- x layout: main, menu, header, footer, toolbar
- modal en reactive form elements
- menu navigatie met de router en async routes
- selected city en darktheme opslaan in services?
- services voor calls naar api
- d3 grafiek
- material ui en theme light/dark
- (material) animatie
- unit tests / end-to-end
- build neerzetten op github pages
- voor de forecast swipeable cards ipv een slider met dagen 
- min en max temperaturen verbeteren
- gebruik de cli waar dat kan
- models ipv interfaces
- eerst met modules, daarna omzetten naar stand-alone components en stand-alone components lazy loaden
- esbuild gebruiken (kan nog niet in dev)
- Angular CDK onderzoeken
- pop-up als je op version klikt
- background corner image van daycard aanpassen aan weer of tijd van dag
- ngrx onderzoeken



# Set-up
To be able to make api calls to open weather map, Create an env.ts file in the root folder and export your own open weather map app-id:  `export const openWeatherMapAppId = '#APP_ID#';`



# WeatherAppAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
