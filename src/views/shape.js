import {Container} from 'pixi.js'
import {Tetro} from './view'
export default class ShapeClass extends Container{
    tetroSize = 0;
    tetros = [];
    constructor(globals){
   super()
   this.tetroSize = globals.boxes;

  let tetro1 = Tetro(globals,0xe61616)
  tetro1.name = "tetro1"
  let tetro2 = Tetro(globals,0xe61616)
  tetro2.name = "tetro2"
  let tetro3 = Tetro(globals,0xe61616)
  tetro3.name = "tetro3"
  let tetro4 = Tetro(globals,0xe61616)
  tetro4.name = "tetro4"
  tetro1.y = 0
  this.addChildAt(tetro1,0)
  tetro2.y = globals.boxes
  this.addChildAt(tetro2,1)
  tetro3.y = globals.boxes*2
  this.addChildAt(tetro3,2)
  tetro4.y = globals.boxes*3
  this.addChildAt(tetro4,3)
  this.tetros = [tetro1,tetro2,tetro3,tetro4]

    }

}