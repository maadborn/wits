import 'jquery';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {ApplicationState} from 'global/applicationstate';

@inject(ApplicationState, HttpClient)
export class App {
  constructor(appState, http) {
    this.state = appState;
    this.http = http;

    http.configure(config => {
      config
        .withBaseUrl(this.state.config.baseUrl)
        .withDefaults({
          headers: {
            'Accept': 'application/json',
          },
        });
    });
  }

  configureRouter(config, router) {
    this.router = router;

    config.title = 'wits';
    config.map([
      { route: ['', 'home'],  title: 'Home',    name: 'home',    moduleId: 'pages/home',    nav: true },
      { route: 'weather',     title: 'Weather', name: 'weather', moduleId: 'pages/weather', nav: true },
    ]);
  }
}
