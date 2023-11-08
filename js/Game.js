class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.leaderboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }
    getState() {
    var gameStateRef = database.ref("gameState")
    gameStateRef.on("value", function(data) { 
        gameState = data.val()
    })
  }

  update(state) {
    database.ref("/").update({ 
      gameState: state
    })
  }

  start() {
    player = new Player();
    playerCount = player.getCount();
    form = new Form();
    form.display();
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1",car1_img)
    car1.scale = 0.07
    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2",car2_img)
    car2.scale = 0.07
    cars = [car1,car2]
    fuels = new Group();
    coins = new Group();
    obstacles = new Group();
    var obstacles_position = [
      {x: width / 2 + 150, y: height - 800, image: obstacle1_img},
      {x: width / 2 - 250, y: height - 1300, image: obstacle2_img},
      {x: width / 2 + 160, y: height - 1800, image: obstacle1_img},
      {x: width / 2 - 190, y: height - 2300, image: obstacle2_img},
      {x: width / 2 + 160, y: height - 2800, image: obstacle1_img},
      {x: width / 2 - 230, y: height - 3300, image: obstacle2_img},      
      {x: width / 2 + 240, y: height - 3800, image: obstacle1_img},
      {x: width / 2 - 170, y: height - 4300, image: obstacle2_img},
      {x: width / 2 + 190, y: height - 4800, image: obstacle1_img},
      {x: width / 2 - 220, y: height - 5300, image: obstacle2_img},      
      {x: width / 2 + 170, y: height - 5800, image: obstacle1_img},
      {x: width / 2 - 240, y: height - 6300, image: obstacle2_img},
    ]
    this.addSprites(fuels,4,fuel_img,0.02);
    this.addSprites(coins,18,coin_img,0.09);
    this.addSprites(obstacles,obstacles_position.length,obstacle1_img,0.04,obstacles_position);
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for(var i = 0; i < numberOfSprites; i++) {
      var x, y;
      
      if(positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      }
      else {
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400);
      }
    var sprite = createSprite(x,y);
    sprite.addImage("sprite",spriteImage);
    sprite.scale = scale
    spriteGroup.add(sprite)
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Iniciar Jogo");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);
    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);
    this.leaderboardTitle.html("Pracar :)");
    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width / 3 - 200, 80)
    this.leader1.class("leadersText")
    this.leader1.position(width / 3 - 200, 120)
    this.leader2.class("leadersText")
    this.leader2.position(width / 3 - 200, 150)
  }

  play() { 
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();


    if(allPlayers !== undefined) {
      image(track_img, 0, - height * 5, width, height * 6);
      this.showLeaderboard();
      var index = 0;
      for(var plr in allPlayers) {
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        cars [index - 1].position.x = x;
        cars [index - 1].position.y = y;
        if(index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          this.handleFuel(index);
          this.handleCoins(index);
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls() {
    if(keyIsDown(32)) {
      player.positionY += 10;
      player.update();
    }

    if(keyIsDown(37)) {
      player.positionX -= 5;
      player.update();
    }

    if(keyIsDown(39)) {
      player.positionX += 5;
      player.update();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        carAtEnd: 0,
        playerCount: 0,
        gameState: 0,
        players: {}
      })
      window.location.reload();
    })
  }

  showLeaderboard() {
    var leader1;
    var leader2;
    var players = Object.values(allPlayers);

    if((players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1) {
      leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
      leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
    }

    if(players[1].rank === 1) {
      leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
      leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
    }
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handleFuel(index) {
    cars[index - 1].overlap(fuels,function(collector,collected) {
      player.fuel = 185;
      collected.remove();
    })
  }

  handleCoins(index) {
    cars[index - 1].overlap(coins,function(collector,collected) {
      player.score += 25;
      player.update();
      collected.remove();
    })
  }
}