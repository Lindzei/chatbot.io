import Main from '../Main';

const App = class App extends Main {
  header() {
    return `
        <header>
        <nav class="navbar ">
            <div class="container-fluid">
                <div class="navbar-brand mb-0 h1">
                    <span class="text-primary">Évaluation Alexandre NICOLLE</span>
                </div>
            </div>
        </nav>
    </header>
  `;
  }

  render() {
    return `
       <div id="app">
           ${this.header()}
             <main class="container-fluid mt-3">
               <div class="row">
                   
                 ${this.contact()}
                   
                 <div class="col-9" style="background-color: DarkGray; position: relative;">
                 <section class="messages-history" style="padding: 10px;">
                 </section>
                   <section class="typing mt-3" style="position: absolute; bottom: -60px;left: 22px;right: 18px;">
                     <div class="row">
                       <div class="col-12">
                         <div class="input-group mb-3">
                           <input type="text" id="message" class="form-control" placeholder="Entrez votre message (help pour obtenir de l'aide)">
                           <button class="btn btn-primary" id="button" type="button">Envoyer</button>
                         </div>
                       </div>
                     </div>
                   </section>
                 </div>
               </div>
             </main>
       </div>
    `;
  }

  contact() {
    const html = this.retrieveContacts();
    return html;
  }

  initialisation() {
    this.init();
    document.body.innerHTML = this.render();
    this.checkCookiesExist();
    this.attachEnterHandler();
    this.attachClickHandler();
  }
};

export default App;