import 'jquery';

export class App {
  constructor() {
    this.message = 'Hello World!';
    this.butter = 'I am butter!';
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
