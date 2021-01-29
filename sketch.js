var  dog, happyDog
var dogImage , happyDogImage
var database
var food, foodStock


function preload()
{
  dogImage = loadImage('images/dogImg.png')
  happyDogImage = loadImage('images/dogImg1.png')
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value" , readStock);
  dog = createSprite(500,480,50,50)
  dog.shapeColor = "green";
  dog.addImage(dogImage);
  dog.scale = 0.3;

}

function draw() {  
background(46,139,87);
textSize(40);
fill("yellow");
text("PEDIGREE LEFT: " + food , 200 , 200);
textSize(30);
text("NOTE:PRESS UP ARROW TO FEED THE DOG " , 200 , 50);
if(keyWentDown(UP_ARROW)){
  writeStock(food);
  dog.addImage(happyDogImage);
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImage);
}

  drawSprites();
  //add styles here
}

function readStock(data){
  food = data.val();
}

function writeStock(F){
  if(F<= 0){
    F = 20;
  }
  else{
    F = F - 1;
  }
  database.ref('/').update({
    Food:F
  });

}