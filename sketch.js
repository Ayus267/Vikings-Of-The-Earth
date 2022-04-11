var ufo,asteroid,bullet,button,restart,gameOver,reset;
var ufo_img,asteroid_img,bullets_img,button_img,background_img,restart_img,gameOver_img;
var bulletGroup, asteroidGroup;
var Play=1,End=0,gameState = Play, score=0, lives=3;
var bg_sound,mute,blast_sound,die_sound,win_sound;
var bullet,asteroid;

function preload(){
 ufo_img = loadImage("./assets/ufo.png");
 background_img = loadImage("./assets/background.png")
 asteroid_img = loadImage("./assets/asteroid.png");
 bullets_img = loadImage("./assets/bullet.png");
 restart_img = loadImage("./assets/restart.png");
 gameOver_img = loadImage("./assets/gameover.png");

 bg_sound = loadSound("./assets/bg sound.mp3");
 blast_sound = loadSound("./assets/blast.mp3");
 die_sound = loadSound("./assets/die.mp3");
 win_sound = loadSound("./assets/win.mp3");
}

function setup(){
 createCanvas(windowWidth, windowHeight);

bg_sound.play();
bg_sound.setVolume(0.5);
 
 ufo = createSprite(100,height/2);
 ufo.addImage(ufo_img);
 ufo.scale = 0.2;

 asteroidGroup = createGroup();

 mute = createImg("./assets/mute.png");
 mute.position(width/2+580,50);
 mute.mouseClicked(mute_fn);
 mute.size(50,50);

 restart=createSprite(width/2-80,height/2+200);
 restart.addImage(restart_img);
 restart.scale = 0.2;

 gameover=createSprite(width/2-80,height/2-10);
 gameover.addImage(gameOver_img);
 gameover.scale = 0.5;

 gameover.visible = false;
 restart.visible = false;

 bullet= createSprite(150, width/2, 50,20);
}

function draw(){
  background(background_img);

  textSize(25);
  textFont("Times New Roman");
  fill("yellow");
  stroke("green");
  text("SCORE: "+score,width/2-130,50);

  if(gameState == Play) {
   textSize(25);
   textFont("Verdana");
   fill("red");
   stroke("yellow");
   text("LIVES: "+lives,width/2-1,50);
  
   createAsteroid();
   move();
   if(frameCount%60==0) 
   {
     bullet= createSprite(150, width/2, 50,20);
  }
   bullet.y= ufo.y-20
   bullet.addImage(bullets_img);
   bullet.scale=0.12;
   bullet.velocityX= 7;

 if((bullet.isTouching(asteroidGroup,bullet_Hit)))
 {
  score=score+1;
  blast_sound.play();
 }

 if(asteroidGroup.isTouching(ufo)){
   lives = lives - 1;
   asteroidGroup.destroyEach();
   die_sound.play()
 }

 if(score >= 5){
   asteroidGroup.setVelocityXEach(-10);
 }
 else
 if(score >= 10){
  asteroidGroup.setVelocityXEach(-15);
 }
 else
 if(score >= 15){
  asteroidGroup.setVelocityXEach(-20);
 }
 else
 if(score >= 20){
  asteroidGroup.setVelocityXEach(-25);
 }
}  //End of gamestate Play

if(lives === 0){
  gameState = End;
}

if(score === 30){
  win_sound.play();
  bg_sound.stop();

  restart.visible = true;
  
  textSize(40);
  textFont("Fort");
  fill("yellow");
  stroke("green");
  text("Congratulations ! You have completed the game",width/2-280,height/2);

  ufo.visible = false;
  asteroidGroup.visible = false;
  gameOver.visible = false;
}

if(gameState == End){
  gameover.visible = true;
  restart.visible = true;

  bg_sound.stop();

  asteroidGroup.setVelocityXEach(0);
  ufo.velocityX=0;

  ufo.visible=false;
  asteroidGroup.visible = false;

  asteroidGroup.setLifetimeEach(-1);

  if(mousePressedOver(restart)) {
    reset();
  }
}
 drawSprites();
}

function bullet_Hit(bullet, asteroid) {
  asteroid.remove();
 }

function createAsteroid(){
  if(frameCount%40==0) {
  asteroid = createSprite(800,random(1,400),40,40); 
  asteroid.addImage(asteroid_img);
  asteroid.scale = 0.1;
  asteroid.velocityX = -7;
  asteroid.lifetime = 500;
  asteroidGroup.add(asteroid);
  }
}

function move(){
  if(keyWentDown("UP_ARROW")){
    ufo.velocityY = -4 ;
    ufo.velocityX = 0
   }
  
   if(keyWentUp("UP_ARROW")){
     ufo.velocityY = 0;
   }
  
   if(keyWentDown("DOWN_ARROW")){
    ufo.velocityY = 4 ;
    ufo.velocityX = 0 ;
   }
  
   if(keyWentUp("DOWN_ARROW")){
    ufo.velocityY = 0;
  }
}

function reset(){
  gameState = Play;
  gameover.visible = false;
  restart.visible = false;
  ufo.visible = true;
    
  asteroidGroup.destroyEach();

  bg_sound.play();

  score = 0;
  lives = 3;
}

function mute_fn(){
 if(bg_sound.isPlaying()){
   bg_sound.stop();
 }
 else{
   bg_sound.play();
 }
}