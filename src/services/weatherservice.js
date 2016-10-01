import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {ApplicationState} from '../global/applicationstate';
import moment from 'moment';

@inject(HttpClient, ApplicationState)
export class WeatherService {
  constructor(http, state) {
    this.http = http;
    this.state = state;
  }

  getWeatherDataFor(locationId, force = false) {
    if (!locationId) {
      locationId = this.state.config.defaultLocationId;
    }

    const cacheKey = this.state.consts.CACHE.WEATHER_FOR + locationId;

    const cachedData = this.state.cache.get(cacheKey);
    if (cachedData !== null) {
      return Promise.resolve(cachedData);
    }

    return this.http.fetch(`${this.state.config.urls.getWeatherDataFor}/${locationId}`)
      .then(response => response.json())
      .then(json => WeatherDataTransformer.transformList(json))
      .then(data => {
        this.state.cache.add(cacheKey, data);
        return data;
      });
  }
  /*
  getAllWeatherData() {
    return this.http.fetch(this.appSettings.urls.getAllWeatherData)
      .then(response => response.json())
      .then(json => transformToDataAndTemp(json))
      .then(data => {
        console.log(data[1]);
      });

    function transformToDataAndTemp(data) {
      const ABSOLUTE_ZERO = -273.15;
      return data._items.map(item => {
        return {
          date: getFormattedDate(item.time), // time seems to be in GMT+2, so correct @ SWE
          temp: item.temp + ABSOLUTE_ZERO,
        };
      });
    }
  }
  */
}

class WeatherDataTransformer {
  static transformList(data) {
    const ABSOLUTE_ZERO = -273.15;
    return data.map(item => {
      if (item.temp) {
        item.temp = parseFloat((item.temp + ABSOLUTE_ZERO).toFixed(1));
      }
      if (item.time) {
        item.time = this.getFormattedDate(item.time); // time seems to be in GMT+2, so correct @ SWE
      }
      return item;
    });
  }

  static getFormattedDate(time) {
    const timeInMs = new Date(time * 1000);
    return moment(timeInMs).format('YYYY-MM-DD HH:mm');
  }
}
