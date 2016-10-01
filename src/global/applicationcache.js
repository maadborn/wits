class CacheItem {
  constructor(validTo, data) {
    this.validTo = validTo;
    this.data = data;
  }
}

export class CacheMap {
  static CACHE_TIMER = 10; // TODO Add more resonable time

  constructor() {
    this.items = new Map();
  }

  add(key, item) {
    clearIfExisting.call(this, key);
    const cacheItem = new CacheItem(getNewCacheTime.call(CacheMap), item);
    this.items.set(key, cacheItem);
    //console.log(`cache: added ${key}`);

    function clearIfExisting(testKey) {
      let cachedItem = this.get(testKey);
      if (cachedItem !== null) {
        this.items.delete(testKey);
        //console.log(`cache: deleted ${testKey}`);
      }
    }

    function getNewCacheTime() {
      return new Date(new Date().getTime() + this.CACHE_TIMER * 1000);
    }
  }

  get(key) {
    const item = this.items.get(key);
    if (item !== undefined) {
      if (item.validTo > new Date()) {
        //console.log(`cache: returned data with key ${key}`);
        return item.data;
      }
    }
    //console.log(`cache: no data found with key ${key}`);
    return null;
  }
}
