var bananaImage, obstacleImage, bananaGroup, bananaImage, obstacleGroup, monkey, monkeyImage, backGroundImage, score, backGround , ground, play = 1, end = 0, gameState = play, endGame;

function preload(){
  
  monkeyImage = loadAnimation("Monkey_01.png",       "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
 backGroundImage=loadImage("jungle2.jpg");
  
  obstacleImage=loadImage("stone.png");
  
  bananaImage=loadImage("Banana.png");
  
  score = 0;
  
  endGame = 0;
 
}


function setup() {
  createCanvas(400,400);
  
  backGround = createSprite(0, 0, 200, 100);
  backGround.velocityX = -3;
  backGround.addImage(backGroundImage);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(35,360,800,5);
  ground.visible=false;
  
  monkey = createSprite(35, 330, 10, 10);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.2;
}

function draw(){
 background(255);
  
  
 if (gameState === play) { 
   
 if(keyDown("space")){
      monkey.velocityY = -20 ;
    }
 
   monkey.velocityY = monkey.velocityY + 0.8;
   
    if (bananaGroup.isTouching(monkey)) {
    score = score+2;
    bananaGroup.destroyEach();
  
   }
   
    if (obstacleGroup.isTouching(monkey)) {
    monkey.scale =0.1;
    endGame = endGame+1;
    obstacleGroup.destroyEach();
    
  }
   
   switch(score) {
    case 10:monkey.scale = 0.2;
            break;
    case 20:monkey.scale = 0.4;
            break;        
            default:break;
  }
   
   
  if (backGround.x<0) {
    backGround.x = backGround.width/2;
  }
   
    createBanana();
  createObstacles();
   
   if (endGame === 2) {
     gameState = end;
   }
   
 }else if (gameState === end) {
  backGround.velocityX = 0;
   
  bananaGroup.setVelocityXEach(0);
   
  obstacleGroup.setVelocityXEach(0);
   
  bananaGroup.setLifetimeEach(-1);
   
  obstacleGroup.setLifetimeEach(-1);
 }
  
 console.log(endGame);
    
    monkey.collide(ground);
  
  drawSprites();
  
  text("score:"+score,50, 50);
  
}

function createBanana(){
  if (frameCount % 80 ===0){
    var banana = createSprite(400, 200, 10, 10);
    banana.addImage (bananaImage);
    banana.scale = 0.03;
    banana.velocityX = -3;
    banana.lifetime = 134;
    
    bananaGroup.add(banana);
  }
}

function createObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400, 350, 10, 40);
    obstacle.velocityX = -3;
    obstacle.addImage (obstacleImage);
  
    obstacle.scale = 0.1;
    obstacle.lifetime = 134;
  
    obstacleGroup.add(obstacle);
  }
}