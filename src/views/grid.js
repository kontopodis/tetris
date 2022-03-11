class Grid {
  matrix;
  shape;
  shapeCoordinates;
  flipShapeIndex;
  boxWidth;
  leftWall = 0;
  rightWall;
  floor;
  SHAPES = shapes;
  constructor(size) {
    const initial2DArray = new Array(10)
      .fill(0)
      .map((rows) => new Array(20).fill(0));
    this.boxWidth = size;
    this.rightWall = size * 10 + size;
    this.floor = 20 * size + size;

    for (
      let columnIndex = 0;
      columnIndex < initial2DArray.length;
      columnIndex++
    ) {
      for (
        let rowIndex = 0;
        rowIndex < initial2DArray[columnIndex].length;
        rowIndex++
      ) {
        initial2DArray[columnIndex][rowIndex] = {
          color: 0x000000,
          position: [columnIndex * size, rowIndex * size],
          exists: false,
          isFloor: false,
        };
        // console.log(initial2DArray[columnIndex][rowIndex])
      }
    }

    this.matrix = initial2DArray;
    this.initShape();
  }

  get Matrix() {
    return this.matrix;
  }
  get Shape() {
    return this.shape;
  }
  get ShapeCoordinates() {
    return this.shapeCoordinates;
  }

  initShape() {
    let id = Math.floor(Math.random() * 7);

    if (id === 0) {
      this.shape = this.SHAPES.line;
    }
    if (id === 1) {
      this.shape = this.SHAPES.square;
    }
    if (id === 2) {
      this.shape = this.SHAPES.gamma;
    }
    if (id === 3) {
      this.shape = this.SHAPES.seven;
    }
    if (id === 4) {
      this.shape = this.SHAPES.sigma;
    }
    if (id === 5) {
      this.shape = this.SHAPES.zita;
    }
    if (id === 6) {
      this.shape = this.SHAPES.taf;
    }

    this.shapeCoordinates = [5, 0];
    this.flipShapeIndex = 0;
    this.shape.flip[0].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row === 1) {
          this.matrix[coo[0]][coo[1]].color = this.shape.color;
          this.matrix[coo[0]][coo[1]].exists = true;
        }
      });
    });
  }
  moveLeft() {
    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if(this.matrix[coo[0]][coo[1]].position[0] === this.leftWall || this.matrix[coo[0]-1][coo[1]].isFloor===true){
        }else{       
             if (row === 1) {
            this.matrix[coo[0]][coo[1]].color = 0x000000;
            this.matrix[coo[0]][coo[1]].exists = false;
          }
        
        }

      });
    });
    this.shapeCoordinates = [
      this.shapeCoordinates[0] - 1,
      this.shapeCoordinates[1],
    ];

    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row === 1) {
          this.matrix[coo[0]][coo[1]].color = this.shape.color;
          this.matrix[coo[0]][coo[1]].exists = true;
        }
      }); 
    });
  }
  moveRigth() {
    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row === 1) {
          this.matrix[coo[0]][coo[1]].color = 0x000000;
          this.matrix[coo[0]][coo[1]].exists = false;
        }
      });
    });
    this.shapeCoordinates = [
      this.shapeCoordinates[0] + 1,
      this.shapeCoordinates[1],
    ];

    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row === 1) {
          this.matrix[coo[0]][coo[1]].color = this.shape.color;
          this.matrix[coo[0]][coo[1]].exists = true;
        }
      });
    });
  }

  moveDown() {
    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row === 1) {
          this.matrix[coo[0]][coo[1]].color = 0x000000;
          this.matrix[coo[0]][coo[1]].exists = false;
        }
      });
    });
    this.shapeCoordinates = [
      this.shapeCoordinates[0],
      this.shapeCoordinates[1] + 1,
    ];

    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row === 1) {
          this.matrix[coo[0]][coo[1]].color = this.shape.color;
          this.matrix[coo[0]][coo[1]].exists = true;
        }
      });
    });
  }


}

const shapes = {
  line: {
    color: 0xe61616,
    flip: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
  },
  square: {
    color: 0xffff00,
    flip: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
  },
  gamma: {
    color: 0x001aff,
    flip: [
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ],
  },
  seven: {
    color: 0x001aff,
    flip: [
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ],
  },
  sigma: {
    color: 0x199800,
    flip: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  zita: {
    color: 0x8e0098,
    flip: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
    ],
  },
  taf: {
    color: 0x00fff7,
    flip: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
};
module.exports = Grid;
