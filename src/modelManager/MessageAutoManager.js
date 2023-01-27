const MessageAutoManager = class MessageAutoManager {
    getContactByActivator(bots, key) {
      const output = [];
      for (let i = 0; i < bots.length; i += 1) {
          const contact = bots[i];
          const bot = [];
          if (contact.trigger.default.input === key
              || contact.trigger.api.input === key || contact.trigger.janken.input === key) {
              const type = this.getKeyByValue(contact.trigger, key);
              contact.message += 1;
              bot.push(type);
              bot.push(contact);
              output.push(bot);
          }
      }

      return output;
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key].input === value);
    }
};

export default MessageAutoManager;