class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }

  setElementsPosition() {
    this.titleImg.position(120,50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  handleMousePressed() {
    this.playButton.mousePressed(()=> {
      this.input.hide();
      var message = `
      Olá, ${this.input.value()}
      </br>Enquanto estamos procurando alguém para jogar isso, 
      </br>mande nesse e-mail
      </br>leonardopulzi@gmail.com
      </br>as seguintes informações:
      </br>Seu RG, seu CPF, seu endereço, 
      </br>seu cartão de crédito, seu nome, email, numero de telfone e um pix de 1 centavo com um pão de queijo garantido :)
      </br> Isso é só uma verificação básica, aproveite esse jogo ruim`
      this.greeting.html(message);
      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
    })
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
