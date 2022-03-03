import { Graphics } from "pixi.js";



const getNewArray = () =>{
    let tempgrid = new Array(10).fill(
        new Array(20).fill({
          coordinates: [0, 0],
          color: "0x000000",
          position: [0, 0],
        })
      );
      return tempgrid
}
export const buildGrid = (tetroSize) =>{

let tempgrid = getNewArray();

let grid= []

  let c = 1;

  tempgrid.map((column, columnIndex) => {
      let col = []
    let r = 3;
    column.map((row, rowIndex) => {


      let ob = {
        coordinates: [columnIndex, rowIndex],
        color: "0x000000",
        position:[tetroSize*c,tetroSize*r]
      };
      //console.log(columnIndex, rowIndex,ob)
     col.push(ob)

      r++;
    });
    grid.push(col)
    c++;
  });
console.log(grid)
  return grid;
}

export const ShapeI = () =>{
    return {
        coordinates : [4,0],
        color:"0x61616",
        activeRotation: 0,
        rotation0 : [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
        rotation90 :[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
        rotation180 :[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
        rotation270 :[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    }
}

export const Shape = (globals)=>{

  let shape = new Graphics()
  shape.name = "line"
  let tetro1 = Tetro(globals,0xe61616)
  tetro1.name = "tetro1"
  let tetro2 = Tetro(globals,0xe61616)
  tetro2.name = "tetro2"
  let tetro3 = Tetro(globals,0xe61616)
  tetro3.name = "tetro3"
  let tetro4 = Tetro(globals,0xe61616)
  tetro4.name = "tetro4"

  shape.addChild(tetro1)
  tetro2.y = globals.boxes
  shape.addChild(tetro2)
  tetro3.y = globals.boxes*2
  shape.addChild(tetro3)
  tetro4.y = globals.boxes*3
  shape.addChild(tetro4)
  return shape

}
export const Tetro = (globals,color)=>{

  let tetro = new Graphics()
let boxes = globals.boxes;
  tetro.lineStyle(1,0xffffff,1)
  tetro.beginFill(color)
  tetro.drawRect(0,0,boxes,boxes)
return tetro
}