import * as PIXI from "pixi.js";
import {
  Background,
  buttonLeft,
  buttonRight,
  buttonTurn,
  buttonDown,
} from "./views/essentials";
import { buildGrid, Shape, ShapeI, Tetro } from "./views/view";
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
let renderer = PIXI.autoDetectRenderer();
let ticker = PIXI.Ticker.shared;
let GRID = buildGrid(GLOBALS.boxes);
let SHAPE = {
  coordinates: [5, 0],
  color: "0x999999",
};
const app = new PIXI.Application({
  width: GLOBALS.width,
  height: ScreenHeight,
});

document.body.appendChild(app.view);
app.stage.addChild(Background(GLOBALS));

const Controls = new PIXI.Container();
app.stage.addChild(Controls);
Controls.y = ScreenHeight - GLOBALS.boxes * 3;
let shape = new ShapeClass(GLOBALS);

const left = buttonLeft(GLOBALS);
left.interactive = true;
left.on("pointerdown", () => {
    let angle = shape.angle
    console.log(shape.x)
    if (angle===0){
        if(shape.x - shape.width < -1 ){}
        else{
            shape.x = shape.x - GLOBALS.boxes
            view.render(renderer);
        }
    }

    if (angle===90){
        if(shape.height - shape.x<-1+GLOBALS.boxes*2){
            shape.x = shape.x - GLOBALS.boxes
            view.render(renderer);
        }
    }

    if (angle===180){
      if(shape.x - shape.width < -1 ){}
      else{
          shape.x = shape.x - GLOBALS.boxes
          view.render(renderer);
      }
  }
    if (angle===270){
      if(shape.height - shape.x<-1+GLOBALS.boxes*2){
          shape.x = shape.x - GLOBALS.boxes
          view.render(renderer);
      }
  }


});
const right = buttonRight(GLOBALS);
const turn = buttonTurn(GLOBALS);
turn.interactive = true;
turn.on("pointerdown", () => {
  let angle = shape.angle;

  if (angle === 0) {
    shape.angle = 90;
  }
  if (angle === 90) {
    shape.angle = 180;
  }
  if (angle === 180) {
    shape.angle = 270;
  }
  if (angle === 270) {
    shape.angle = 0;
  }
});
const down = buttonDown(GLOBALS);
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
export const View = () => {
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
};
const floor = new PIXI.Graphics();
floor.lineStyle(1,0xffffff,1)
floor.lineTo(GLOBALS.boxes*10,0)
view.addChild(floor);
floor.y = GLOBALS.boxes*20
view.addChild(shape);
import ShapeClass from './views/shape'
let temp = new ShapeClass(GLOBALS)
view.addChild(temp)
console.log(temp.children)
console.log(temp.tetros)
View();

const moveShape = () => {
 

  let angle = shape.angle
  console.log(angle)
  if(angle === 0 ){
      if((shape.height+shape.y)<=floor.y+GLOBALS.boxes*2){
        shape.y = shape.y+GLOBALS.boxes;
        console.log(floor.y,shape.y+shape.height)
      }else{
        let tetros = shape.tetros

        for (let i=0; i < tetros.length;i++){
          let tetro = shape.getChildAt(i)
          let p = tetro.getGlobalPosition()
          console.log(p)
          tetro.x = p.x;
          tetro.y = p.y
          view.addChild(tetro)
        }
   

        view.removeChild(shape)
          shape = Shape(GLOBALS)
          view.addChild(shape)
          
      }
  }

  if(angle === 90 ){
    if((shape.width+shape.y)<=floor.y){
      shape.y = shape.y+GLOBALS.boxes;
      console.log(floor.y,shape.y+shape.height,angle)
    }else{
        shape = Shape(GLOBALS)
        view.addChild(shape)
        
    }
}

if(angle === 180 ){
  if((shape.width+shape.y+GLOBALS.boxes)<=floor.y){
    shape.y = shape.y+GLOBALS.boxes;
    console.log(floor.y,shape.y+shape.height,angle)
  }else{
      shape = Shape(GLOBALS)
      view.addChild(shape)
      
  }
}

if(angle === 270 ){   
   if((shape.width+shape.y-GLOBALS.boxes)<=floor.y){
  shape.y = shape.y+GLOBALS.boxes;
  console.log(floor.y,shape.y+shape.height,angle)
}else{
 

    shape = Shape(GLOBALS)
    view.addChild(shape)
    
}
}
  
 


  
};

let cicle = 0;

ticker.add(function () {
  let time = ticker.elapsedMS;

  cicle = cicle + time;
  if (cicle > 500) {
    cicle = 0;

    moveShape();

    view.render(renderer);
  }
});

