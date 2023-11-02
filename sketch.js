var canvas;
var backgroundImage, car1_img, car2_img, track_img;
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

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1_img = loadImage("./assets/car1.png")
  car2_img = loadImage("./assets/car2.png")
  track_img = loadImage("./assets/pista.png")
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
