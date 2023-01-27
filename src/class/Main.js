import MessageManager from '../modelManager/MessageManager';
import BotManager from '../modelManager/BotManager';
import MessageAutoManager from '../modelManager/MessageAutoManager';
import Cookies from './Cookies';
import API from './API';

const Main = class Main {
    init() {
        this.botManager = new BotManager();
        this.botManager.initialisation();
        this.messageManager = new MessageManager();
        this.messageAutoManager = new MessageAutoManager();
    }

    checkCookiesExist() {
        const cookies = Cookies.getCookie('APP_MESSAGE');
        if (cookies.length > 0) {
            for (let i = 0; i < cookies.length; i += 1) {
                const message = cookies[i];
                this.messageManager.addMessage(message.sender, message.message);
                this.retrieveChat(message);
            }
        }
    }

    addMessage(input) {
        const messageChat = input;
        const currentUser = {
            id: 1,
            name: 'Rayman',
            avatar: 'https://dailygeekshow.com/wp-content/uploads/sites/2/2016/05/hero-rayman.jpg',
            status: 'active',
            offset: 'offset-6',
            message: 0
        };
        if (messageChat === 'help') {
            const message = `
            Voici les commandes disponibles :
                <ul>
                    <li>Bonjour : Les bots vous répondront un message de bienvenue</li>
                    <li>Roll : Lance 6 dés à 6 faces.</li>
                    <li>Groupe Sanguin : Razoff vous répondra son groupe sanguin</li>
                    <li>Bière : Marin vous répondra sa bière préférée</li>
                    <li>Janken : Les bots vont jouer à Pierre Feuille Ciseaux
                </ul>
            `;
            this.messageManager.addMessage(currentUser, message);
            const messageCurrentUser = this.messageManager.getLastMessage();
            this.retrieveChat(messageCurrentUser);
            return;
        }
        this.messageManager.addMessage(currentUser, messageChat);
        this.retrieveChat(this.messageManager.getLastMessage());
        Cookies.setCookie('APP_MESSAGE', this.messageManager.getMessage(), 30);
        const checkActivator = this.messageAutoManager.getContactByActivator(
          this.botManager.getContacts(),
          messageChat
        );

            if (checkActivator.length > 0) {
                const bots = checkActivator;
                for (let i = 0; i < bots.length; i += 1) {
                    const bot = bots[i];
                    const typeObject = bot[0];
                    const botInfos = bot[1];
                    const botElement = botInfos.trigger[typeObject];
                    const typeRetrieve = botElement.type;
                    // Si le type est api: alors on effectue une requête à l'API
                    // et on stocke dans response un retour au format JSON
                    if (typeObject === 'api') {
                        const api = new API(botElement.url);
                        api.initalisation('GET', (data) => {
                            const response = JSON.parse(data);
                            if (response !== false) {
                                const messageAutoStringed = this.getCommand(
                                    botElement.response,
                                    typeRetrieve,
                                    response
                                );
                                this.messageManager.addMessage(botInfos, messageAutoStringed);
                                const message = this.messageManager.getLastMessage();
                                this.retrieveChat(message);
                                Cookies.setCookie('APP_MESSAGE', this.messageManager.getMessage(), 30);
                            }
                        });
                    } else if (typeObject === 'janken') {
                        this.messageManager.addMessage(botInfos, botElement.response);
                        const message = this.messageManager.getLastMessage();
                        this.retrieveChat(message);
                        Cookies.setCookie('APP_MESSAGE', this.messageManager.getMessage(), 30);
                    } else {
                        this.messageManager.addMessage(botInfos, botElement.response);
                        const message = this.messageManager.getLastMessage();
                        this.retrieveChat(message);
                        Cookies.setCookie('APP_MESSAGE', this.messageManager.getMessage(), 30);
                    }
                }
        }
    }

    // Récupère la liste des bots
    retrieveContacts() {
        const contacts = this.botManager.getContacts();
        let html = '<div class="col-3"><ul class="list-group "> ';
        contacts.forEach((element) => {
            html += `
       <li class="bg-dark text-light list-group-item d-flex justify-content-between align-items-center">
         <img width="50" class="border border-secondary border-2" src="${element.avatar}"/>
           ${element.name}
       </li>`;
        });
        html += '</ul></div>';

        return html;
    }

    // Nouvelle méthode pour gérer les events
    // Anciennement j'avais une méthode pour gérer les clics et une autre pour la touche entrée
    attachEventHandlers() {
        const scope = this;
        const inputElement = document.getElementById('message');
        document.getElementById('button').onclick = function () {
          scope.addMessage(inputElement.value);
          inputElement.value = '';
          window.scrollTo(0, document.body.scrollHeight);
        };
        inputElement.onkeyup = function (evt) {
          if (evt.key === 'Enter') {
            scope.addMessage(evt.target.value);
            inputElement.value = '';
            window.scrollTo(0, document.body.scrollHeight);
          }
        };
      }

    // Récupère l'historique des messages stockés
    retrieveChat(instance) {
        const element = document.getElementsByClassName('messages-history');
        const div = document.createElement('div');
        div.setAttribute('class', 'row mt-2');

        // https://getbootstrap.com/docs/4.0/components/card/
        // offset me permet d'appliquer un décalage si le message vient du user
        // Sans offset tout serait aligné à gauche (voir offset -6)
        // D'où le offset dans le model Bot.js
        // Une autre méthode aurait été d'appliquer le offset directement ici
        // Pour toucher au offset il faut aller dans addMessage (main.js)
        const html = `
             <div class="col-6 ${instance.sender.offset}">
               <div class="card text-bg-dark">
                 <h3 class="card-header">
                   <img  width="20%" src="${instance.sender.avatar}" class="img-thumbnail" alt="...">
                   ${instance.sender.name}
                 </h3>
                 <div class="card-body">
                   <h6 class="card-title">${instance.date} ${instance.hour}</h6>
                   <p class="card-text">${instance.message}</p>
                 </div>
               </div>
             </div>
             <div class="col-6"></div>`;

        div.innerHTML = html.trim();
        element[0].appendChild(div);
    }

    // Nouvelle méthode de récupération des commandes
    getCommand(message, type, apiResponse) {
        const commands = {
            blood: `${message} ${apiResponse.group}`,
            biere: `${message} ${apiResponse.name} de la marque ${apiResponse.brand}`,
            roll: `${message} ${apiResponse.details} pour un total de ${apiResponse.result}`
        };
        return commands[type] || '';
    }
};

export default Main;