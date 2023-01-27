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
        } else {
            const checkActivator = this.messageAutoManager.getContactByActivator(
                this.botManager.getContacts(),
                messageChat
            );
            console.log(checkActivator);

            this.messageManager.addMessage(currentUser, messageChat);
            const messageCurrentUser = this.messageManager.getLastMessage();
            this.retrieveChat(messageCurrentUser);

            Cookies.setCookie('APP_MESSAGE', this.messageManager.getMessage(), 30);

            if (checkActivator.length > 0) {
                const bots = checkActivator;
                for (let i = 0; i < bots.length; i += 1) {
                    const bot = bots[i];
                    const typeObject = bot[0];
                    const botInfos = bot[1];
                    const botElement = botInfos.trigger[typeObject];
                    const typeRetrieve = botElement.type;
                    console.log(typeObject);
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
    }

    // Récupère la liste des bots
    retrieveContacts() {
        const contacts = this.botManager.getContacts();
        console.log(contacts);
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

    // Permet d'effectuer une commande avec le bouton Envoyer
    attachClickHandler() {
        const scope = this;
        document.getElementById('button').onclick = function () {
            const inputElement = document.getElementById('message');
            scope.addMessage(inputElement.value);
            // Remise à 0 du texte dans la frame de texte
            inputElement.value = '';
            console.log(inputElement);

            window.scrollTo(0, document.body.scrollHeight);
        };
    }

    // Permet d'effectuer une commande avec la touche entrée
    // Marche aussi avec la touche du pavé numérique
    attachEnterHandler() {
        const scope = this;
        // Récupère l'élément message qui correspond à la barre de texte
        document.getElementById('message').onkeyup = function (evt) {
            if (evt.key === 'Enter') {
                const inputElement = document.getElementById('message');
                scope.addMessage(evt.target.value);
                inputElement.value = '';
                // Remise à 0 du texte dans la frame de texte
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

    // Permet d'appeler une commande de bot
    getCommand(message, type, apiResponse) {
        let output = '';
        switch (type) {
            case 'blood':
                output = `${message} ${apiResponse.group}`;
                break;
            case 'biere':
                output = `${message} ${apiResponse.name} de la marque ${apiResponse.brand}`;
                break;
            case 'roll':
                output = `${message} ${apiResponse.details} pour un total de ${apiResponse.result}`;
                break;
            default:
                output = '';
                break;
        }
        return output;
    }
};

export default Main;