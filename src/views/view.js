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
