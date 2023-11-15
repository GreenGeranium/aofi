import { backUrl } from './db';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //обработка запроса
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardsAmount(databaseLink) {
    return fetch(`${this._baseUrl}${databaseLink}?populate=*`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // получение всех предложений данной секции
  getCardsForCategory(databaseLink) {
    return fetch(`${this._baseUrl}${databaseLink}?populate=*`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // получение основных категорий с сервера
  getMainCategories() {
    return fetch(`${this._baseUrl}/main-categories?populate=*`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: `${backUrl}/api`,
  headers: {
    Authorization: `Bearer bb86ffce2a27972c9526e87d1a940ed330470a63bfb7641e962ae649ff5f66acde09f166c47ab27491000c93d7ca1ef527f16ed767d427d1d608f559f989de923623494aea170f9fff73d5708a5008a52fca94c2e7df56471075c99d02014df7b6e9dee53d91a78082a6c73188c2cda6ad72896e49f0e8bf4f2978b331d267c1`,
    'Content-Type': 'application/json',
  },
});

export default api;
