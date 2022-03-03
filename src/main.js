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
let shape = Shape(GLOBALS);

const left = buttonLeft(GLOBALS);
left.interactive = true;
left.on("pointerdown", () => {
  if (SHAPE.coordinates[0] <= 0) {
  } else {
    SHAPE.coordinates[0] = SHAPE.coordinates[0] - 1;
    let pos = GRID[SHAPE.coordinates[0]][SHAPE.coordinates[1]].position;
    shape.x = pos[0];
    view.render(renderer);
  }
});
const right = buttonRight(GLOBALS);
const turn = buttonTurn(GLOBALS);
turn.interactive = true;
turn.on("pointerdown", () => {
  let coo = SHAPE.coordinates;
  let pos = GRID[coo[0]][coo[1]].position;

  shape.pivot.y = GLOBALS.boxes * 2;
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
const floor = new PIXI.Graphics();
app.stage.addChild(view);
view.addChild(floor);

export const View = () => {
  const width = GLOBALS.width;
  const height = GLOBALS.height;
  const boxes = GLOBALS.boxes;
  const lines = GLOBALS.lines;

  view.lineStyle(3, 0x999999, 1);
  view.drawRect(
    boxes - 2,
    boxes * 3 - 1,
    width - boxes * 2,
    height - boxes * 6
  );
};
view.addChild(shape);

View();

const moveShape = () => {
  let coo = SHAPE.coordinates;
  let pos = GRID[coo[0]][coo[1]].position;

  shape.x = pos[0];
  shape.y = pos[1];
  SHAPE.coordinates[1] = SHAPE.coordinates[1] + 1;

  let angle = shape.angle;

  if (angle === 0) {
    if (shape.height + pos[1] > GRID[0][19].position[1] + GLOBALS.boxes) {
      shape = Shape(GLOBALS);

      SHAPE = {
        coordinates: [5, 1],
      };
      shape.y = GLOBALS.boxes * 3;
      shape.x = GLOBALS.boxes * 6;
      view.addChild(shape);
    }
  }
  if (angle === 90) {
    if (shape.width + pos[1] > GRID[0][19].position[1] + GLOBALS.boxes) {
      floor.addChild(shape);
      shape = Shape(GLOBALS);

      SHAPE = {
        coordinates: [5, 1],
      };
      shape.y = GLOBALS.boxes * 3;
      shape.x = GLOBALS.boxes * 5;
      view.addChild(shape);
    }
  }
};

let cicle = 0;

ticker.add(function () {
  let time = ticker.elapsedMS;

  cicle = cicle + time;
  if (cicle > 1500) {
    cicle = 0;

    moveShape();

    view.render(renderer);
  }
});
