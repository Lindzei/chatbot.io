import axios from 'axios';

const API = class API {
  #url;

  constructor(url) {
    this.#url = url;
  }

  initalisation(method, callback) {
    const param = {
      method,
      url: this.#url,
      headers: {

      }
    };
    // https://medium.com/dlt-labs-publication/3-promise-based-http-clients-to-use-in-nodejs-f76393afb085
    axios(param)
        .then((response) => callback(JSON.stringify(response.data)))
        .catch((error) => console.log(error));
  }
};

export default API;