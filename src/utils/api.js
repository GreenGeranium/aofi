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
    Authorization: `Bearer 4034a621f46df5137ffa569969bbf573d3c36953428a6c14f70135ffbd58e0631abfbf8ff51a776f9f4341bd9cfeb703af24ba969dedc138799ddfb5bb44fddffa157f83174656f1af11980387ba6d230cfdd623121f227155deb61b371969b89172a33125acd4a7a416fad0758d88440e924372c7752fde1436222d651b78db`,
    'Content-Type': 'application/json',
  },
});

export default api;
