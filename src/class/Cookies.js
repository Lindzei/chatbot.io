// https://morioh.com/p/86545e1a5365
const Cookies = class Cookies {
  static setCookie(cname, cvalue, exdays) {
      console.log(cvalue);
      Cookies.eraseCookie('APP_MESSAGE');
      const cookies = [];
      if (cvalue.length > 0) {
          for (let i = 0; i < cvalue.length; i += 1) {
              const cookie = cvalue[i];
              cookies.push(cookie);
          }
      }
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `${cname}=${JSON.stringify(cookies)};${expires};path=/`;
  }

  static getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            const string = c.substring(name.length, c.length);

            return JSON.parse(string);
        }
    }
    return '';
  }

  static eraseCookie(name) {
      document.cookie = `${name}=; Max-Age=-99999999;`;
  }
};

export default Cookies;