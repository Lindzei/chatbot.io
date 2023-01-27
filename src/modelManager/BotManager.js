import Bots from '../mock/Bots';
import Bot from '../model/Bot';

const BotManager = class BotManager {
  #contacts;

  initialisation() {
    this.#contacts = [];

    for (let i = 0; i < Bots.length; i += 1) {
      const element = Bots[i];
      this.#contacts.push(new Bot(
          element.id,
          element.name,
          element.avatar,
          element.status,
          element.offset,
          element.trigger,
          element.message
      ));
    }
  }

  getContacts() {
    return this.#contacts;
  }
};

export default BotManager;