const Message = class Message {
  id;

  sender;

  date;

  hour;

  message;

  constructor(id, sender, date, hour, message) {
    this.id = id;
    this.sender = sender;
    this.date = date;
    this.hour = hour;
    this.message = message;
  }
};

export default Message;