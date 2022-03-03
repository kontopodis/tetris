import * as PIXI from 'pixi.js'
import {
    Background,
    buttonLeft,
    buttonRight,
    buttonTurn,
    buttonDown
} from './views/essentials'
import {buildGrid,ShapeI} from './views/view'
const ScreenWidth  = window.innerWidth-18
const ScreenHeight  = window.innerHeight-20
const body = document.querySelector("body")
body.style.display = "flex"
body.style.justifyContent = "center"

var width = ScreenWidth;
if (ScreenWidth>600){    width=600 }



const GLOBALS = {
    "width": (ScreenHeight/26 * 12),
    "height":ScreenHeight,
    "boxes":ScreenHeight/26,
    "lines":ScreenHeight/26  
}

let GRID = buildGrid(GLOBALS.boxes)
let SHAPE = {
    coordinates:[5,0],
    color:"0x999999",    
}
const app = new PIXI.Application({width:GLOBALS.width,height:ScreenHeight});

document.body.appendChild(app.view);
app.stage.addChild(Background(GLOBALS))

const Controls = new PIXI.Container()
app.stage.addChild(Controls)
Controls.y = ScreenHeight-(GLOBALS.boxes*3)

const left = buttonLeft(GLOBALS)
left.interactive = true
left.on("pointerdown",()=>{
    console.log(SHAPE.coordinates[0])
    if(SHAPE.coordinates[0]<=0){}else{
        SHAPE.coordinates[0] = SHAPE.coordinates[0]-1 
    
    }
    GRID[SHAPE.coordinates[0]][SHAPE.coordinates[1]].color = SHAPE.color
    GRID[SHAPE.coordinates[0]+1][SHAPE.coordinates[1]].color = "0x000000"
    console.log("left",GRID[SHAPE.coordinates[0]][SHAPE.coordinates[1]])
    
})
const right = buttonRight(GLOBALS)
const turn = buttonTurn(GLOBALS)
const down = buttonDown(GLOBALS)
Controls.addChild(down)
Controls.addChild(turn)
Controls.addChild(left)
Controls.addChild(right)
const view = new PIXI.Graphics();
app.stage.addChild(view)

export const View = () => {
    const width = GLOBALS.width;
    const height = GLOBALS.height;
    const boxes = GLOBALS.boxes;
    const lines = GLOBALS.lines;
  
  view.clear()
  
  
  
    view.lineStyle(1, 0x777777, 1);
  GRID.map((col,colIndex)=>{
      col.map((row,rowIndex)=>{
   
          view.beginFill(row.color)
          view.drawRect(row.position[0],row.position[1], boxes, boxes);
          view.endFill()
      })
  })
  
  
  
    view.lineStyle(3, 0x999999, 1);
    view.drawRect(boxes-2, boxes * 3-1, width - boxes * 2, height - boxes * 6);
  

  };


View()

SHAPE = ShapeI()

const moveShape = ()=>{
    let previousCoordinates = SHAPE.coordinates
    
    
    SHAPE.coordinates[1] = SHAPE.coordinates[1]+1;

    let p = SHAPE.coordinates;
    

}
let renderer = PIXI.autoDetectRenderer();
let ticker = PIXI.Ticker.shared;
let cicle = 0;
ticker.add(function () {
    let time = ticker.elapsedMS

    cicle = cicle + time;
    if(cicle>2000){
        cicle = 0;
       
        moveShape()
        console.log(SHAPE)
    }
  View()

});


