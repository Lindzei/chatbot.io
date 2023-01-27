import Message from '../model/Message';

const MessageManager = class MessageManager {
  constructor() {
    this.messagesAlreadySended = [];
  }

  addMessage(sender, messageSended) {
    const date = new Date().toLocaleDateString('fr-FR');

    const hour = new Date().toLocaleTimeString('fr-FR');

    const message = new Message(1, sender, date, hour, messageSended);

    this.messagesAlreadySended.push(message);
  }

  getMessage() {
    return this.messagesAlreadySended;
  }

  getLastMessage() {
    return this.messagesAlreadySended.slice(-1)[0];
  }
};

export default MessageManager;