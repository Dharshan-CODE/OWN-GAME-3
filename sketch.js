var ground,Bground,Cground;
var player,player_running,player_jumping;

var obstacle1,obstacle2,obstaclesG,obs1,obs2;

var coin,coinGroup,coinImg;
var score = 0;
var heart1,heart2,heart3,life;
var heart = 3;
var deathCount;
var restart,restartImg;


var gameState = "start";





function preload(){
  player_running = loadAnimation("Player/1.png","Player/2.png","Player/3.png","Player/4.png"
  ,"Player/5.png","Player/6.png","Player/7.png","Player/8.png","Player/9.png","Player/10.png");

  player_rolling = loadAnimation("Player/11.png","Player/12.png","Player/13.png","Player/14.png"
  ,"Player/15.png","Player/16.png","Player/17.png","Player/18.png")

  coinImg = loadAnimation("Points/1.png","Points/2.png","Points/3.png","Points/4.png","Points/5.png"
  ,"Points/6.png")

  bg = loadImage("bgg.png");
  gameover = loadImage("bg2.jpg");

  obs1 = loadAnimation("Obstacle2/1.png","Obstacle2/2.png","Obstacle2/3.png");
  obs2 = loadAnimation("Obstacle1/tile000.png","Obstacle1/tile001.png","Obstacle1/tile002.png",
  "Obstacle1/tile003.png");
  obs3 = loadAnimation("Obstacle3/1.png","Obstacle3/2.png","Obstacle3/3.png","Obstacle3/4.png");

  life = loadAnimation("Heart/1.png","Heart/2.png","Heart/3.png","Heart/4.png","Heart/5.png"
  ,"Heart/6.png");

  restartImg = loadImage("restart.png");

}
function setup(){
  createCanvas(800,600);

  Bground = createSprite(500,300,50,50);
  Bground.addImage(bg);
  ground = createSprite(500,470,1000,20);
  ground.shapeColor = "green";
  ground.visible = false;

  player = createSprite(75,470,45,45);
  player.addAnimation("running",player_running);
  player.addAnimation("rolling",player_rolling);
  player.setCollider("circle",0,0,100);
  player.debug = false;
  player.scale = 0.5;

  heart1 = createSprite(100,100,50,50);
  heart1.addAnimation("Heart",life);
  heart1.scale = 0.75;
  heart2 = createSprite(170,100,50,50);
  heart2.addAnimation("Heart",life);
  heart2.scale = 0.75;
  heart3 = createSprite(240,100,50,50);
  heart3.addAnimation("Heart",life);
  heart3.scale = 0.75;

  coinG = new Group();
  obstaclesG = new Group();

  deathCount = 0;

  restart = createSprite(400,380);
  restart.addImage(restartImg);
  restart.scale = 0.25;

}
function draw(){

  
  background("black");
  if(gameState === "start"){
    textSize(20);
    fill("green"); 
    strokeWeight(2);
    stroke("red");
    text("THIS IS STORY OF A NINJA BOY WHO HAVE TO COLLECT GOLD COINS",80,140);
    text("TO SAVE HIS VILLAGE FROM THE ENEMY.YOU HAVE TO DESTROY ALL ",80,170);
    text("THE ENEMY AND COLLECT COINS AND GEMS.",80,200);
    text("THE RULES OF THIS GAME ARE AS FOLLOW:-",80,230);
    fill("orange"); 
    stroke("blue");
    text("YOU HAVE THREE LIVES",120,260);
    text("YOU CAN ATTACK ALL THE OBSTACLES",120,290);
    text("PRESS A TO ATTACK USING ARROW",120,320); 
    text("PRESS UP ARROW KEY TO JUMP",120,350);
    text("PRESS DOWN ARROW KEY TO COME BACK DOWN",120,380);
    text("PRESS SPACE KEY TO ROLL",120,410);
    text("PRESS P TO START :)",120,440);

    if(keyDown("p")){
      gameState = "play";

    }
  

  }

  if(gameState === "play"){

    restart.visible = false;
    
    player.collide(ground);
  player.velocityY = player.velocityY + 0.5;

  if(keyDown(UP_ARROW) && player.y>400){   
    player.velocityY = -18;
    player.changeAnimation("running",player_running);
    player.scale = 0.5;
  }
  if(keyDown(DOWN_ARROW)){   
    player.velocityY = 15;
  }
  if(keyDown("space")){   
    player.changeAnimation("rolling",player_rolling);
    player.scale = 0.35;
  }
 
  Bground.velocityX = -8;
  if(Bground.x<-4000){
    Bground.x=500;
  }  

  for(var i=0 ;i<coinG.length; i++){

    if (coinG.get(i).isTouching(player)){
         score+=1
         coinG.get(i).destroy();
    }
  }

  if(obstaclesG.isTouching(player)){
    console.log(deathCount);
    deathCount = deathCount + 1;
    obstaclesG.destroyEach();
     
 }
 if(deathCount === 1){
   heart3.visible = false;

 }
 if(deathCount === 2){
  heart2.visible = false;

}
if(deathCount === 3){
  heart1.visible = false;
  gameState = "end";

}
  spawnCoin();
  spawnObstacles();
  drawSprites();

  textSize(24);
  fill("white");
  strokeWeight(2);
  stroke("black")
  text("COINS : " + score ,100,50);

  
  }
   if(gameState === "end"){
    background(gameover);
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
   
  }
  
 
}

function reset(){
   background("black");

   gameState = "play";
   score = 0;

   obstaclesG.destroyEach();
   coinG.destroyEach();

}
function spawnCoin(){
  var rand = Math.round(random(10,100));
  if (frameCount % rand === 0) {
      coin = createSprite(900,120,40,10);
      coin.y = Math.round(random(150,320));
      coin.addAnimation("coins",coinImg);
      coin.scale = 0.5;
      coin.velocityX = -8;
      
       //assign lifetime to the variable
      coin.lifetime = 200;  
    
      coin.depth=player.depth;
      player.depth=player.deph+1;
    
      
      coinG.add(coin);

  }
}

function spawnObstacles(){
  if (frameCount % 180 === 0) {
    obstacle1 = createSprite(900,380,40,40);
    obstacle1.addAnimation("1",obs1);
    obstacle1.scale = 0.15;
    obstacle1.velocityX = -8;
    
     //assign lifetime to the variable
    obstacle1.lifetime = 200;  
  
    obstacle1.depth=player.depth;
    player.depth=player.deph+1;

    obstaclesG.add(obstacle1);
   }

   if (frameCount % 100 === 0) {
    var rand = Math.round(random(200,450));
    obstacle2 = createSprite(900,rand,40,40);
    obstacle2.addAnimation("2",obs2);
    obstacle2.scale = 0.25;
    obstacle2.velocityX = -8;
    
     //assign lifetime to the variable
    obstacle2.lifetime = 200;  
  
    obstacle2.depth=player.depth;
    player.depth=player.deph+1;
  
    
    obstaclesG.add(obstacle2);

    
   }

   if (frameCount % 450 === 0) {
    obstacle3 = createSprite(900,400,40,40);
    obstacle3.addAnimation("1",obs3);
    obstacle3.scale = 0.15;
    obstacle3.velocityX = -8;
    
     //assign lifetime to the variable
    obstacle3.lifetime = 200;  
  
    obstacle3.depth=player.depth;
    player.depth=player.deph+1;

    obstaclesG.add(obstacle3);
   }
}