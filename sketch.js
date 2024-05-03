// Variáveis da Bola
let xB = 300; // Posição x
let yB = 200; // Posição y 
let dB = 17; // Diâmetro
let vXB = 5; // Velocidade do x
let vYB = 5; // Velocidade do y
let rB = dB/2; // Raio da Bola

// Variáveis da Raquete
let xR = 10; // Posição x
let yR = 150; // Posição y
let wR = 10; // Width da Raquete
let hR = 100; // Height da Raquete

// Variáveis do Oponente
let xRO = 580;
let yRO = 150;
let vYRO; 
let col = false;
let erro = 0;

// Placar
let points1 = 0;
let points2 = 0;

// Sons
let Raquetada;
let Ponto;
let Trilha;

function preload()
{
  Trilha = loadSound("trilha.mp3");
  Ponto = loadSound("ponto.mp3");
  Raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  Trilha.loop();
}

function draw() {
  background(0);
  
  // Bola
  Bola();
  movBola();
  colBola();
  BugB();
  
  // Raquete
  Raquete(xR,yR);
  movRaquete();
  /*colRaquete();*/
  colBRa(xR,yR);
  
  // Raquete do bot
  Raquete(xRO,yRO);
  movRaOponente();
  colBRa(xRO,yRO);
  
  // Placar
  Placar();
  Pontos();
}
  
  
// Funções

// Bola
function Bola() // Cria a Bola
{
  circle(xB,yB,dB);
}
  
function movBola() // Cria o Movimento da Bola
{
  xB += vXB;
  yB += vYB;
}
  
function colBola() // Verfica a colisão da Bola
{
  if(xB + rB > width || xB - rB < 0)
  {
    vXB *= -1;
  }
  
  if(yB + rB > height || yB - rB < 0)
  {
    vYB *= -1;
  }
}

function BugB(){
    if (xB - rB < 0){
    xB = 23
    }
}

// Raquete
function Raquete(x,y) // Cria a Raquete (agora tem parâmetros)
{
  rect(x,y,wR,hR);
}

function movRaquete() // Movimenta a Raquete
{
  if(keyIsDown(87))
    {
      yR -= 10;
    }
  if(keyIsDown(83))
    {
      yR += 10;
    }
}

function colBRa(x,y) // Verifica a colisão da Bola na Raquete utilizando uma "biblioteca" externa
{
  let colTrue = collideRectCircle(x, y, wR, hR, xB, yB, dB);
  
  if(colTrue)
    {
      vXB *= -1
      Raquetada.play();
    }
}

/*function colRaquete() // Verifica se a Bola toca a Raquete de forma manuscrita
{
  if(xB - rB < xR + wR && yB - rB < yR + hR && yB + rB > yR)
    {
      vXB *= -1;
    }
}*/
 
// Raquete do Oponente

function movRaOponente() // Movimenta a Raquete do Oponente
{
  /*if(keyIsDown(UP_ARROW))
    {
      yRO -= 10;
    }
  if(keyIsDown(DOWN_ARROW))
    {
      yRO += 10;
    }*/
  
  vYRO = yB - yRO - wR / 2 - 30;
  yRO += vYRO + erro;
  ChanceDeErrar();
}

function ChanceDeErrar()
{
  if (points2 >= points2) {
    erro += 1
    if (erro >= 39){
    erro = 40
    }
  } else {
    erro -= 1
    if (erro <= 35){
    erro = 35
    }
  }  
}

// Placar

function Placar()
{
  stroke(255);
  textAlign(CENTER);
  textSize(30).
  fill(color(255,140,0));
  rect(127,14,50,30);
  rect(427,14,50,30);
  fill(255);
  text(points1,150,40);
  text(points2,450,40);
}

function Pontos()
{
  if(xB > 590)
    {
      points1 ++;
      Ponto.play();
    }
  
  if(xB < 10)
    {
      points2 ++;
      Ponto.play();
    }
}
  

