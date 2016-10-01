import {inject} from 'aurelia-framework';
import {ApplicationConfig} from './applicationconfig';
import {ApplicationConsts} from './applicationconsts';
import {CacheMap} from './applicationcache';

@inject(ApplicationConfig, ApplicationConsts, CacheMap)
export class ApplicationState {
  constructor(config, consts, cache) {
    this.config = config;
    this.cache = cache;
    this.consts = consts;
    this.store = {};
  }
}
