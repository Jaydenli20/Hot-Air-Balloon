var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var score = 0; 
var gameState = "play"
var gameOver, gameOver_img
var restart, restart_img

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

restart_img = loadImage("assets/restart.png")
gameOver_img = loadImage("assets/gameOver.png")
}

function setup(){
createCanvas(800, 400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

gameOver = createSprite(400, 200, 50, 50)
gameOver.addImage("Game Over Text", gameOver_img)
gameOver.scale = 0.5; 

restart = createSprite(400, 250, 50, 50)
restart.addImage("Restart", restart_img)
restart.scale = 0.5

bar_group = new Group();
obsTop_group = new Group();
obsBottom_group = new Group(); 


}

function draw() {
  
  background("black");
 
if(gameState==="play"){
  //making the hot air balloon jump
    if(keyDown("space") || keyIsDown(UP_ARROW)) {
  balloon.velocityY = -6 ;
  }

//adding gravity
 balloon.velocityY = balloon.velocityY + 2;
          spawnObstaclesTop();
           Bar();
           spawnObstaclesBottom();
           for(var i = 0; i<bar_group.length; i++){
            if(balloon.isTouching(bar_group[i])){
              score += 5
              bar_group[i].destroy();
             }
           }
          

           gameOver.visible = false
           restart.visible = false
           if(balloon.isTouching(obsTop_group) || balloon.isTouching(obsBottom_group) || balloon.isTouching(bottomGround) || balloon.isTouching(topGround)){
              gameState = "end"
          }
        }
         
        if(gameState === "end"){
          obsBottom_group.setVelocityXEach(0);
          obsTop_group.setVelocityXEach(0)
          bar_group.setVelocityXEach(0)

          obsBottom_group.setLifetimeEach(-1)
          obsTop_group.setLifetimeEach(-1)
          bar_group.setLifetimeEach(-1)

          balloon.y = 200;
          balloon.velocityX = 0;
          balloon.velocityY = 0;
          
          gameOver.visible = true
          restart.visible = true 

          if(mousePressedOver(restart)){
            reset()
          }
         
        }
   
        drawSprites();
        text("score: "+score, 100, 30)
}

function spawnObstaclesTop(){
  if(frameCount%60===0){
  obstaclesTop = createSprite(800, 50, 40, 50);
  obstaclesTop.velocityX = -4
  obstaclesTop.scale = 0.1;
  obstaclesTop.lifetime = 205;
  balloon.depth=obstaclesTop.depth+1
  obstaclesTop.y = Math.round(random(30,100))
  ran = Math.round(random(1,2))
  obsTop_group.add(obstaclesTop)

  switch(ran){
    case 1: obstaclesTop.addImage(obsTop1)
    break;

    case 2: obstaclesTop.addImage(obsTop2)
    break;

    default: 
  }
  }
}
function Bar(){
  if(frameCount%60===0){
    bar = createSprite(800, 200, 10, 800)
    bar.velocityX = -6
    balloon.depth=bar.depth
    bar.lifetime = 170
    bar_group.add(bar)
    bar.visible= false;     
  }
}

function spawnObstaclesBottom(){
  if(frameCount%100===0){
    obstaclesBottom = createSprite(800, 350, 40, 50)
    obstaclesBottom.velocityX = -4
    obstaclesBottom.scale = 0.1;
    obstaclesBottom.lifetime = 195;
    balloon.depth=obstaclesBottom.depth+1
    //obstaclesBottom.y = Math.round(random(250, 30))
    ran = Math.round(random(1,3))
    obsBottom_group.add(obstaclesBottom)

    switch(ran){
      case 1: obstaclesBottom.addImage(obsBottom1)
      break;

      case 2: obstaclesBottom.addImage(obsBottom2)
      break;

      case 3: obstaclesBottom.addImage(obsBottom3)
      break;
      
      default: 
    }
  }
}

function reset(){
  gameState = "play"
  obsBottom_group.destroyEach();
  obsTop_group.destroyEach();
  bar_group.destroyEach();
  score = 0;

}