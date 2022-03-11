class Grid {
  matrix;
  shape;
  shapeCoordinates;
  flipShapeIndex;
  boxWidth;
  leftWall;
  rightWall;
  floor;
  SHAPES = shapes;
  constructor(size) {
    const initial2DArray = new Array(10)
      .fill(0)
      .map((rows) => new Array(20).fill(0));
    this.boxWidth = size;
    this.rightWall = size * 10;
    this.leftWall = size;
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
     
      }
    }

    this.matrix = initial2DArray;
    this.initShape();
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

    this.shapeCoordinates = [4, 0];
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
    let Positions = []
    let previousCoordinates = []
    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row===1){
          let pos = this.matrix[coo[0]][coo[1]].position
          previousCoordinates.push([coo[0]-1,coo[1]])
          Positions.push(pos)
        }
      })
    })

    let allowMove = true
    Positions.map((pos,index)=>{
     
      if(pos[0] < this.leftWall){
        allowMove = false
      }
    })
    previousCoordinates.map(coo=>{
    
      if(coo[0]>=0){
        let isFloor = this.matrix[coo[0]][coo[1]].isFloor 
        if(isFloor){ allowMove = false}
      }

    })

  
    if (allowMove){

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
    /*
    */
  }
  moveRight() {

    let Positions = []
    let nextCoordinates = []
    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row===1){
          let pos = this.matrix[coo[0]][coo[1]].position
          nextCoordinates.push([coo[0]+1,coo[1]])
          Positions.push(pos)
        }
      })
    })

    let allowMove = true
    Positions.map((pos,index)=>{
    
      if(pos[0]+this.boxWidth > this.rightWall){
        allowMove = false
      }
    })
    nextCoordinates.map(coo=>{
 
      if(coo[0]<=this.matrix.length-1){
        let isFloor = this.matrix[coo[0]][coo[1]].isFloor 
        if(isFloor){ allowMove = false}
      }else{allowMove=false}

    })

if (allowMove){

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
  }

  moveDown() {

    let Positions = []
    let nextCoordinates = []
    let parentCoordinates = []
    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row===1){
          let pos = this.matrix[coo[0]][coo[1]].position
          nextCoordinates.push([coo[0],coo[1]+1])
          Positions.push(pos)
          parentCoordinates.push(coo)
        }
      })
    })

    let allowMove = true
    Positions.map((pos,index)=>{
    
      if(pos[1]+this.boxWidth > this.floor){
        allowMove = false
      }
    })
    nextCoordinates.map((coo,index)=>{
      console.log(index,": ",coo)
      if(coo[1]<=this.matrix[1].length-1){
        let isFloor = this.matrix[coo[0]][coo[1]].isFloor 
        if(isFloor){ allowMove = false}
      }else{allowMove=false}

    })

    if(allowMove){
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
            console.log(coo)
            this.matrix[coo[0]][coo[1]].color = this.shape.color;
            this.matrix[coo[0]][coo[1]].exists = true;
          }
        });
      });
    }else{

      parentCoordinates.map(row=>{
        this.matrix[row[0]][row[1]].isFloor = true;
      })

      this.initShape()
    }

  }

  flipShape(){
    let allowMove = true
    let Positions = []
    let nextCoordinates = []
    let previousFlipIndex = this.flipShapeIndex;
    let currentCoordinates = []
    if(this.shape.flip.length-1 > this.flipShapeIndex){
      this.flipShapeIndex++
    }else{
      this.flipShapeIndex=0;
    }

    if(previousFlipIndex === this.flipShapeIndex){
      allowMove = false;
    }
   
    this.shape.flip[this.flipShapeIndex].map((col, colIndex) => {
      col.map((row, rowIndex) => {
        let coo = [
          colIndex + this.shapeCoordinates[0],
          rowIndex + this.shapeCoordinates[1],
        ];
        if (row===1){
          let pos = this.matrix[coo[0]][coo[1]].position
          nextCoordinates.push([coo[0]+1,coo[1]])
          Positions.push(pos)
          currentCoordinates.push(coo)

        }
      })
    })

   
    nextCoordinates.map(coo=>{
      let box = this.matrix[coo[0]][coo[1]]
      if(box.isFloor){allowMove=false}
  
      if(box.position[1] > this.floor || box.position[1] > this.rightWall || box.position[0] < this.leftWall){
        allowMove = false
        console.log(allowMove,box)
      }      
    })

    if (allowMove){
      this.shape.flip[previousFlipIndex].map((col, colIndex) => {
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
