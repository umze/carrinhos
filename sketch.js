var canvas;
var backgroundImage, car1_img, car2_img, track_img, fuel_img, coin_img, obstacle1_img, obstacle2_img;
var bgImg;
var database;
var form, player;
var playerCount;
var gameState;
var allPlayers;
var car1;
var car2;
var cars = [];
var track;
var fuels, coins, obstacles;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1_img = loadImage("./assets/car1.png")
  car2_img = loadImage("./assets/car2.png")
  track_img = loadImage("./assets/pista.png")
  fuel_img = loadImage("./assets/fuel.png")
  coin_img = loadImage("./assets/goldCoin.png")
  obstacle1_img = loadImage("./assets/obstacle1.png")
  obstacle2_img = loadImage("./assets/obstacle2.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
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
