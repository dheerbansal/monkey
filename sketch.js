PLAY = 1;
END = 0;
gameState = PLAY;

var jungleImg
var ground , groundImg
var monkey, monkey_running, monkeyGroup
var bananaObstacle, bananaImg, bananaObstacleGroup
var stone, stoneImg, stoneGroup

var score = 0;

function preload(){
jungleImg = loadImage("jungle.jpg");
  
groundImg = loadImage("ground.jpg");
  
//monkeyImg = loadImage ("Monkey_01.jpg")
  
bananaImg = loadImage("Banana.png");
  
stoneImg = loadImage("stone.png");
  
}

function setup(){
  createCanvas(400,400);
  
jungle = createSprite(0,0,400,400);
jungle.addImage(jungleImg);
jungle.scale = 1.1;
jungle.velocityX = -2
jungle.x = jungle.width/2;
  
ground = createSprite(200,395,400,3);
ground.visible = true;
ground.shapeColor="white"
ground.scale = 1;

monkey = createSprite(15,365,15,15);
monkey.addImage (monkeyImg);
monkey.scale = 0.01;
//monkeyGroup = new group();
  
bananaObstacleGroup = new Group();
  
stoneGroup = new Group();

}

function draw(){
 background("black")
  
  if(gameState === PLAY){
    if(jungle.x<0){
     jungle.x = jungle.width/2 
    jungle.velocityX = -3;
    }
    jungle.velocityX = -3;
    
    jungle.visible = true
    
     spawnMonkey();
    spawnBananaObstacle();
    spawnStone();
    
    
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    if(monkey.isTouching(bananaObstacleGroup)){
      score = score +2
      bananaObstacle.destroy();
    }
    
    if(score === 40){
    monkey.x = 40;
      monkey.y = 373;
       }
    if(score >10){
      monkey.scale = 0.11
    }
    
    if(score >20){
     monkey.scale = 0.12; 
    }
    
    if(score >30){
     monkey.scale = 0.13; 
    }

    if(score === 40){
      monkey.scale = 0.14;
    }
    
   // if(score === 10){
     //text("you win",200,200);
      //gameState = END
      //}
    
    if(monkey.isTouching(stoneGroup)){
      monkey.scale = monkey.scale - 0.2;
      stoneGroup.scale = stone.scale + 0.2;
    }

       if(monkey.isTouching(stoneGroup)&& stoneGroup.scale === 0.12){
       stone.destroy();
      bananaObstacle.destroy();
      monkey.y = 450;
      monkey.x = 40;
      gameState = END;
       }
    
    }else if (gameState===END) {
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    bananaObstacleGroup.setVelocityXEach(0);
    bananaObstacleGroup.setLifetimeEach(-1);

    jungle.velocityX = 0;
    stone.x = 425;
    stone.y = 320
    //jungle.visible = false;
    
    if(keyDown(DOWN_ARROW)){
     monkey.x = 30;
      monkey.y = 365;
      gameState = PLAY; 
      score = 0;
    }
    
}

monkeyGroup.display();
jungle.display();
stoneGroup.display();
bananaObstacleGroup.display();
  
 
  
drawSprites();


fill("white");
stroke("white");
text("score:" + score,301,17);
text("press down arrow to restart",50,17);

}


function spawnMonkey(){
  if(monkey.y < 0){
  monkey = createSprite(40,365,15,15);
  monkey.addImage(monkeyImg);
  }
  monkey.scale = 0.1;
  monkey.collide(ground)
}

function spawnBananaObstacle(){
  if(frameCount % 127 === 0){
    bananaObstacle = createSprite(390,305,15,15);
    bananaObstacle.addImage (bananaImg)
    bananaObstacle.scale = 0.03
    bananaObstacle.velocityX = -5;
    bananaObstacle.lifetime = 200;
    bananaObstacleGroup.add(bananaObstacle);
  }
}

function spawnStone(){
 if(frameCount % 175 === 0) {
   stone = createSprite(390,388,15,15);
   stone.addImage(stoneImg);
   stone.scale = 0.10;
   stone.velocityX = -5;
   stone.lifetime = 200;
   stoneGroup.add(stone);
   }
  }

  function keypressed(){
    if(keyCode === UP_ARROW){
      monkey.velocityy = -15 
    }
  }