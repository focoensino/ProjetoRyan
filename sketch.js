const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, rope2, rope3;
var fruit;
var fruitCon, fruitCon2, fruitCon3;
var bgImg, fruitImg, rabbitImg;
var rabbit;
var button;

var bk_song;
var sad_sound;
var cut_sound;
var eating_sound;
var air;

function preload() {
  bgImg = loadImage("./assets/bg.png");
  fruitImg = loadImage("./assets/candy.png");
  rabbitImg = loadImage("./assets/bocaaber.png");

  bk_song = loadSound("./assets/sound1.mp3");
  sad_sound = loadSound("./assets/sad.wav");
  cut_sound = loadSound("./assets/rope_cut.mp3");
  eating_sound = loadSound("./assets/eating_sound.mp3");
  air = loadSound("./assets/air.wav");

  blink = loadAnimation("./assets/per1.png");
  eat = loadAnimation("./assets/bocaaber.png", "./assets/per1.png");

  sad = loadAnimation("./assets/per2.png");
  eat.looping = false;
}

function setup() {
  createCanvas(500, 700);
  bk_song.play();
  bk_song.setVolume();
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  button = createImg("./assets/tes.png");
  button.position(20, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  button2 = createImg("./assets/tes.png");
  button2.position(230, 5);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  button3 = createImg("./assets/tes.png");
  button3.position(430, 200);
  button3.size(50, 50);
  button3.mouseClicked(drop3);

  mute_btn = createImg("./assets/mute.png");
  mute_btn.position(450, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  ground = new Ground(200, 690, 600, 20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  rope = new Rope(8, { x: 40, y: 30 });
  rope2 = new Rope(7, { x: 260, y: 5 });
  rope3 = new Rope(10, { x: 495, y: 210 });

  fruitOptions = {
    density: 0.001,
  };

  fruit = Bodies.circle(300, 300, 15, fruitOptions);
  Composite.add(rope.body, fruit);

  fruitCon = new Link(rope, fruit);
  fruitCon2 = new Link(rope2, fruit);
  fruitCon3 = new Link(rope3, fruit);

  rabbit = createSprite(250, 650, 100, 100);
  rabbit.scale = 0.2;

  rabbit.addAnimation("blinking", blink);
  rabbit.addAnimation("eating", eat);
  rabbit.addAnimation("crying", sad);
  rabbit.changeAnimation("blinking");

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  imageMode(CENTER);
}

function draw() {
  background(51);
  image(bgImg, width / 2, height / 2, 500, 700);
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();

  if (fruit != null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);
  }

  Engine.update(engine);

  drawSprites();

  if (collide(fruit, rabbit) == true) {
    rabbit.changeAnimation("eating");
    eating_sound.play();
  }

  if (fruit != null && fruit.position.y >= 650) {
    rabbit.changeAnimation("crying");
    bk_song.stop();
    sad_sound.play();
    fruit = null;
  }
}

function drop() {
  cut_sound.play();
  rope.break();
  fruitCon.detach();
  fruitCon = null;
}
function drop2() {
  cut_sound.play();
  rope2.break();
  fruitCon2.detach();
  fruitCon2 = null;
}
function drop3() {
  cut_sound.play();
  rope3.break();
  fruitCon3.detach();
  fruitCon3 = null;
}

function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  } else {
    bk_song.play();
  }
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    );
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}
