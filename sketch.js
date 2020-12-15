var tela = 1;
var largura = 200;
var altura = 50;
var xmenu = 225;
var ymenu1 = 100;
var ymenu2 = 155;
var cont = 0;


function preload(){
  img = loadImage('foguete.jpg');
  img2= loadImage ('bum.jpg')  
}

let balls = [];

let threshold = 30;
let accChangeX = 0;
let accChangeY = 0;
let accChangeT = 0;





function setup() {
  createCanvas(600, 400);

  xobs=300;
  yobs=200;
  xjog=0;
  yjog=150;
  robs=100;
  rjog=40;

  for (let i = 0; i < 10; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  
  
  if(tela==1){
    background(0);
  
    stroke(240);

    if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu1 &&       mouseY <ymenu1 + altura) {  
      fill(256,256,0);   
      if(mouseIsPressed){
        tela = 2;
      }
    }else{
      fill(256,256,256);
    }
    rect(xmenu,ymenu1,largura,altura,300); 

    
    fill(20); 
    textAlign(CENTER);
    noStroke();
    text ("PLAY",325,135);
    textSize(20);
  
  
    stroke(240);
    if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu2 &&       mouseY <ymenu2 + altura) {  

      fill(256,256,0);   
      if(mouseIsPressed){
        tela = 3;
      }
      
    } else{
      fill(256,256,256);
    }
    rect(xmenu,ymenu2,largura,altura,300); 
    
    
    fill(20); 
    textAlign(CENTER);
    noStroke();
    text ("AJUDA",325,190);
    textSize(20);
  } 

  if(tela==2) {
     background(255);
    cont= cont + 1;
    text("Pontos:"+cont,60,20);
    textSize(25);
    
    
    image(img,xjog,yjog, rjog, rjog);
        if(keyIsDown(DOWN_ARROW)){
        if(yjog<380){
           yjog=yjog+5;
        } 
          
          
        }
        
        if(keyIsDown(UP_ARROW)){
        if(yjog>0){
           yjog=yjog-5;
        }  
        }
    
        if(keyIsDown(LEFT_ARROW)){
        if(xjog>0){
          xjog=xjog-5;
        }
        }
        
        if(keyIsDown(RIGHT_ARROW)){
        if(xjog<580)  {
        xjog=xjog+5;
        }
        }
        for (let i = 0; i < 10; i++) {
        if (dist(balls[i].x,balls[i].y, xjog,yjog) < rjog){       
          
        image(img2,xobs,yobs, robs,robs);
        tela=4;
        xjog=0;
        yjog=300;  
        }
        }
        

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }

  checkForShake();
  }
  
  if (tela == 3){
    background(10);
    fill(0,256,0);
    text("CONSTRUÇÃO", 325,190);
    textSize(50);
    noStroke();   

  } 
  if (tela == 4){
    background(0);
    fill(0,256,0);
    text("Seus pontos:"+cont, 325,100);
    textSize(40);
    noStroke();   
  if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > 300 && mouseY <300 + altura) {  
      fill(256,256,0);   
      if(mouseIsPressed){
        tela = 1;
      }
    }else{
      fill(256,256,256);
    }
    rect(xmenu,300,largura,altura,300); 

    
    fill(20); 
    textAlign(CENTER);
    text ("BACK",325, 340);
    textSize(20);
  } 
}

function checkForShake() {
 
  accChangeX = abs(accelerationX - pAccelerationX);
  accChangeY = abs(accelerationY - pAccelerationY);
  accChangeT = accChangeX + accChangeY;
  
  if (accChangeT >= threshold) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].shake();
      balls[i].turn();
    }
  }

  else {
    for (let i = 0; i < balls.length; i++) {
      balls[i].stopShake();
      balls[i].turn();
      balls[i].move();
    }
  }
}

// clase Ball
class Ball {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10,50);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
    this.oxspeed = this.xspeed;
    this.oyspeed = this.yspeed;
    this.direction = 0.9;
  }

  move() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  }

  
  turn() {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    } else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    } else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    } else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  }

  
  shake() {
    this.xspeed += random(5, accChangeX / 3);
    this.yspeed += random(5, accChangeX / 3);
  }

  // Desacelera gradualmente
  stopShake() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    } else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    } else {
      this.yspeed = this.oyspeed;
    }
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
  
}