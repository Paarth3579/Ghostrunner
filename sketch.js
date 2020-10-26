var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
 
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  
  
}

function draw(){
  background(0);
  if(gameState === "play" ){
    
  
  
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
   if(keyDown("right")){
     ghost.x= ghost.x+3;
   }
  if(keyDown("left")){
    ghost.x = ghost.x-3;
  }
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gameState="End";
    
  }
    drawSprites();
  }
  if(gameState==="End"){
    textSize(30)
    fill("yellow")
    text("GAME OVER",230,250);
  }
}
 


function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    
    var invisibleBlock = createSprite(200,15);
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg); 
    climber.addImage(climberImg);
    
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
   
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    invisibleBlock.debug = true ;
    //add each door to the group
    doorsGroup.add(door);
    
    climbersGroup.add(climber);
   invisibleBlockGroup.add(invisibleBlock);
  }
}
    

