export class ApplicationConfig {
  constructor() {
    this.environment = Environments.TEST;  // Change this to fit the current needs
    //this.environment = Environments.DEV;  // Change this to fit the current needs

    this.defaultLocationId = 2716758;


    this.setUrls();
  }

  setUrls() {
    const urlFactory = new UrlFactory();
    this.urls = urlFactory.getUrls('http://localhost:5100/');

    this.baseUrl = '';

    if (this.environment === Environments.DEV) {
      this.baseUrl = 'http://localhost:5100/';
    } else if (this.environment === Environments.TEST) {
      this.baseUrl = 'http://192.168.1.159:5100/';
    }

    if (!this.baseUrl) {
      throw new Error('No baseUrl set');
    }
  }
}

const Environments = {
  DEV: 'DEV',
  TEST: 'TEST',
  PROD: 'PROD',
};

class UrlFactory {
  getUrls(baseUrl) {
    return {
      getAllWeatherData: 'weather',
      getWeatherDataFor: 'custom/weather',
    };
  }
}
