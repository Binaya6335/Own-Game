var PLAY = 1;
var END = 0;
var bullets = 70;
var life = 3;
var gameState = "fight";
var score;

var spaceship,asteroid,space
var Bullet,Bullet1,Bullet2,Bullet3,Bullet4,bulletGroup;
var heart1,heart2,heart3;
var spaceshipImage,asteroidImage;
var asteroidGroup,asteroidImage;
var bulletImg,gameOverImg;
var destroySound,shootSound,GameOverSound;

function preload(){
  spaceshipImage = loadImage("Spaceship.png");
  space = loadImage("Background.png");
  asteroidImage = loadImage("Asteroid.png");
  gameOverImg = loadImage("Gameover.png")  
  destroySound = loadSound("Asteroid Destroy.mp3")
  shootSound = loadSound("Shoot1.mp3")
  bulletImg = loadImage("Bullet.png");
  heart1Img = loadImage("heart_1.png");
  GameoverSound = loadSound("Game Over.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  spaceship = createSprite(windowWidth/2, windowHeight-100, 50, 50);
  spaceship.addImage("spc", spaceshipImage);
  spaceship.scale = 0.2;

  heart1 = createSprite(windowWidth/2+900,windowHeight/2-500,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4;

  gameOver = createSprite(windowWidth/2,windowHeight/2-20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2;
  
  spaceship.setCollider("rectangle",0,0,spaceship.width,spaceship.height);
  spaceship.debug = true;

  bulletGroup = new Group()
  asteroidGroup = new Group()

  score = 0;

}

function draw() {
  
  background(space);

  textFont("algerian");
  textSize(30);
  fill("black");
  stroke("white");
  text("Score: "+ score, windowWidth/2-950, windowHeight/2-500);

  if(gameState === "fight"){

    spaceship.debug = false;

    gameOver.visible = false;
    heart1.visible = true

  if(life===1){
    heart1.visible = true;
  }

  if(life===0){
    heart1.visible=false;
    gameState = END
  }
    
  if(keyDown("Left")) {
      spaceship.x=spaceship.x-20
  }

  if(keyDown("Right")) {
      spaceship.x=spaceship.x+20
  }

   if(keyDown("space")) {
      Bullet = createSprite(spaceship.x,spaceship.y-70,50,50)
      Bullet.addImage(bulletImg);
      Bullet.scale = 0.09;
      Bullet.velocityY = -12;
      Bullet.lifetime = 200;
      bulletGroup.add(Bullet);
      shootSound.play();
  }

if(asteroidGroup.isTouching(spaceship))
{
gameState = "END";
GameoverSound.play();
}

if(asteroidGroup.isTouching(bulletGroup)){

  for(var i=0;i<asteroidGroup.length;i++){     
       
   if(asteroidGroup[i].isTouching(bulletGroup)){
    score = score + 1;
    destroySound.play();
    asteroidGroup[i].destroy()
      } 
  
  }
 }

enemy();

  }

else if(gameState==="END"){
    gameOver.visible = true;
    heart1.visible = false;
    spaceship.visible = false;
    asteroidGroup.destroyEach();
    bulletGroup.destroyEach();
    textFont("algerian");
    textSize(30);
    fill("black");
    stroke("white");
    text("Please Press CTRL+R to startover again and your score is : "+score, windowWidth/2-460, windowHeight/2+50);
  } 

  drawSprites();
}

function enemy(){
  if(frameCount%50===0){

    asteroid = createSprite(random(0,2000),random(0,500),40,40)
    asteroid.addImage(asteroidImage)
    asteroid.scale = 0.4
    asteroid.velocityY = 6
    asteroid.lifetime = 600
    asteroidGroup.add(asteroid)
  }
}
