var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1_img = loadImage("./assets/car1.png")
  car2_img = loadImage("./assets/car2.png")
  track_img = loadImage("./assets/PISTA.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();
  game.getState();
}

function draw() {
  background(backgroundImage);
  if(playerCount === 2) {
    game.update(1)
  }
  if(gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
