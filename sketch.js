var gameState="PLAY"

var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost, ghostImg;   
var invisible,invisibleGroup;
var gameSound

function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png")
  ghostImg = loadImage("ghost-standing.png")
  gameSound = loadSound("spooky.wav")
  
  doorsGroup = new Group();
  climbersGroup= new Group();
  invisibleGroup= new Group();
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=3;
  
  ghost = createSprite(200,200,50,50)
  ghost.addImage("standing",ghostImg)
  ghost.scale=0.4
  
  
  
}

function draw(){
  
  background(0)
  
  if (gameState==="PLAY"){
    
   //  gameSound.loop();
  
  if(keyDown("space")){
      ghost.velocityY=-5 
     }
   ghost.velocityY=ghost.velocityY+0.5
  
  if(keyDown("right_arrow")){
      ghost.x=ghost.x+5 
     }
  
  if(keyDown("left_arrow")){
      ghost.x=ghost.x-5 
  }
  
  if(tower.y>400){
     
    tower.y=300;
     
     }
  
  spawnDoors();
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
 if(invisibleGroup.isTouching(ghost) || ghost.y>600 || ghost.y<0 ){
    
      
    //door.destroy(); 
     ghost.destroy();
    //climber.destroy();
    // tower.destroy();
    
      gameState="END"
      
     }   
     drawSprites();
}
  
  if(gameState==="END"){
    
    textSize(40);
    text("GAMEOVER",220,250);
    
  
  }
  

}

function spawnDoors(){
  
  if (frameCount % 240 === 0) {
    var door = createSprite(200,-50);
    door.x = Math.round(random(120,500));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    
    var climber = createSprite(200,-1);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    
    var invisible = createSprite(200,-1);
    invisible.width=climber.width;
    invisible.height=2 
    invisible.visible=false
    invisible.x= door.x;
    invisible.velocityY = 1;
    invisible.lifetime = 800;
    
    
    
    ghost.depth=door.depth
    ghost.depth+=1
    
   climbersGroup.add(climber);
    invisibleGroup.add(invisible);
    doorsGroup.add(door);
  }
}
