const Bot = class Bot {
  id;

  name;

  avatar;

  status;

  trigger;

  message;

  constructor(
      id,
      name,
      avatar,
      status,
      // offset me permet de définir un offset pour différencier le user du bot dans le chat
      // Utile uniquement pour le front
      offset,
      trigger,
      message
  ) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.status = status;
    this.offset = offset;
    this.trigger = trigger;
    this.message = message;
  }
};

export default Bot;