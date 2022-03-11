import * as PIXI from "pixi.js";
import {
  Background,
  buttonLeft,
  buttonRight,
  buttonTurn,
  buttonDown,
} from "./views/essentials";
import { buildGrid, Shape, ShapeI, Tetro } from "./views/view";
import Grid from './views/grid'
const ScreenWidth = window.innerWidth - 18;
const ScreenHeight = window.innerHeight - 20;
const body = document.querySelector("body");
body.style.display = "flex";
body.style.justifyContent = "center";

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
  Matrix.moveDown()
  Draw()
  view.render(renderer)
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


export const Draw = () => {
  const width = GLOBALS.width;
  const height = GLOBALS.height;
  const boxes = GLOBALS.boxes;
  const lines = GLOBALS.lines;

  view.lineStyle(3, 0x999999, 1);
  view.drawRect(
   0,
    0,
    GLOBALS.boxes*10,
    GLOBALS.boxes*20
  );

  Matrix.matrix.map((rows=>{
    rows.map(row=>{
      view.lineStyle(1,0x333333,1)
      view.beginFill(row.color)
      view.drawRect(row.position[0],row.position[1],GLOBALS.boxes-2,GLOBALS.boxes-2)
      view.endFill()
    })
  }))
};
const floor = new PIXI.Graphics();
floor.lineStyle(1,0xffffff,1)
floor.lineTo(GLOBALS.boxes*10,0)
view.addChild(floor);
floor.y = GLOBALS.boxes*20



Draw();



let cicle = 0;

ticker.add(function () {
  let time = ticker.elapsedMS;

  cicle = cicle + time;
  if (cicle > 500) {
    cicle = 0;
    
    Draw()
    
  }
});

