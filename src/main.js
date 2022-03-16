import * as PIXI from "pixi.js";
import {
  Background,
  buttonLeft,
  buttonRight,
  buttonTurn,
  buttonDown,
} from "./views/essentials";
import Grid from './views/grid'
const ScreenWidth = window.innerWidth - 18;
const ScreenHeight = window.innerHeight - 20;
const body = document.querySelector("body");
body.style.display = "flex";
body.style.justifyContent = "center";
document.addEventListener('keydown', (event) => {
  var name = event.key;

  // Alert the key name and key code on keydown
  if(name==="Enter"){ alert(`Key pressed ${name} Game Paused`);}
 
  if(name==="ArrowUp"){
    Matrix.flipShape()
    Draw()
    view.render(renderer)
  }
  if(name==="ArrowDown"){
    pressedDown = true
    Matrix.moveDown()
    Draw()
    view.render(renderer)
  }
  if(name==="ArrowLeft"){
   
    Matrix.moveLeft()
    Draw()
    view.render(renderer)
  }
  if(name==="ArrowRight"){

  Matrix.moveRight()
  Draw()
  view.render(renderer)
  }
}, false);

document.addEventListener('keyup', (event) => {
  var name = event.key;

  if (name === "ArrowDown"){
    pressedDown = false
  }
}, false);
var width = ScreenWidth;
if (ScreenWidth > 600) {
  width = 600;
}

const GLOBALS = {
  width: (ScreenHeight / 26) * 12,
  height: ScreenHeight,
  boxes: ScreenHeight / 26,
  lines: ScreenHeight / 26,
};
const Matrix = new Grid(GLOBALS.boxes)

let renderer = PIXI.autoDetectRenderer();
let ticker = PIXI.Ticker.shared;

const app = new PIXI.Application({
  width: GLOBALS.width,
  height: ScreenHeight,
});

document.body.appendChild(app.view);
app.stage.addChild(Background(GLOBALS));

const Controls = new PIXI.Container();
app.stage.addChild(Controls);
Controls.y = ScreenHeight - GLOBALS.boxes * 3;
var pressedDown = false


const left = buttonLeft(GLOBALS);
left.interactive = true;
left.on("pointerdown",()=>{
 
  Matrix.moveLeft()
  Draw()
  view.render(renderer)
})

const right = buttonRight(GLOBALS);

right.interactive = true;
right.on("pointerdown",()=>{

  Matrix.moveRight()
  Draw()
  view.render(renderer)
})

const turn = buttonTurn(GLOBALS);
turn.interactive = true;
turn.interactive = true;
turn.on("pointerdown",()=>{
  Matrix.flipShape()
  Draw()
  view.render(renderer)
})

const down = buttonDown(GLOBALS);
down.interactive = true;
down.on("pointerdown",()=>{
  pressedDown = true
  Matrix.moveDown()
  Draw()
  view.render(renderer)
})
down.on("pointerup",()=>{
  pressedDown = false
})
Controls.addChild(down);
Controls.addChild(turn);
Controls.addChild(left);
Controls.addChild(right);

const view = new PIXI.Graphics();

app.stage.addChild(view);

view.width = GLOBALS.boxes*10
view.height = GLOBALS.boxes*20
view.x = GLOBALS.boxes
view.y = GLOBALS.boxes*3
const styleScore = new PIXI.TextStyle({
  dropShadow: true,
  dropShadowAngle: 0.8,
  dropShadowBlur: 1,
  dropShadowColor: "#6d0000",
  fill: "red",
  fontFamily: "Tahoma",
  fontSize: 18,
  fontWeight: "bold"
});

export const Draw = () => {
  view.removeChildren()
  view.clear()

  
  view.lineStyle(2, 0x999999, 1);
  view.drawRect(
   0,
    0,
    GLOBALS.boxes*10,
    GLOBALS.boxes*20
  );

  const score = new PIXI.Text(Matrix.Score, styleScore);

  score.x = 0;
  score.x = 0;
    view.addChild(score)
  
  Matrix.matrix.map((rows=>{
    rows.map(row=>{
      view.lineStyle(1,0x111111,1)
      view.beginFill(row.color)
      view.drawRect(row.position[0],row.position[1],GLOBALS.boxes-3,GLOBALS.boxes-3)
      view.endFill()
    })
  }))

  if(Matrix.GameOver){
    const style = new PIXI.TextStyle({
      dropShadow: true,
      dropShadowAngle: 0.8,
      dropShadowBlur: 1,
      dropShadowColor: "#6d0000",
      fill: "red",
      fontFamily: "Tahoma",
      fontSize: 36,
      fontWeight: "bold"
  });
  const text = new PIXI.Text('Game Over', style);

    view.addChild(text)
  }
};




Draw();



let cicle = 0;
let throtleDown = 0;



ticker.add(function () {
  let time = ticker.elapsedMS;

  cicle = cicle + time;
throtleDown = throtleDown+time


if(pressedDown && throtleDown > 40){
  throtleDown=0;

  Matrix.moveDown()
  Draw()
  view.render(renderer)
}



  if (cicle > 500) {
    cicle = 0;
    Matrix.moveDown()
    Draw()
    view.render(renderer)
  }
});

