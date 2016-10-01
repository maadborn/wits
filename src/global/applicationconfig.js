export class ApplicationConfig {
  constructor() {
    this.environment = Environments.TEST;  // Change this to fit the current needs
    //this.environment = Environments.DEV;  // Change this to fit the current needs

    this.defaultLocationId = 2716758;

    this.setUrls();
  }

  setUrls() {
    const urlFactory = new UrlFactory();

    if (this.environment === Environments.DEV) {
      this.urls = urlFactory.getUrls('http://localhost:5100');
    } else if (this.environment === Environments.TEST) {
      this.urls = urlFactory.getUrls('http://192.168.1.159:5100');
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
      getAllWeatherData: `${baseUrl}/weather`,
      getWeatherDataFor: `${baseUrl}/custom/weather`,
    };
  }
}
