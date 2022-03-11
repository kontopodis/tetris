var assert = require('chai').assert;
var Grid = require("../src/views/grid")

describe("Init",()=>{



    describe("Grid",()=>{
    
    
        it("Is Array",()=>{
            let matrix = new Grid(10);
            let grid = matrix.Matrix;
            assert.isNotFalse(grid)
        })
        it("Is 2D Array",()=>{
            let matrix = new Grid(10);
    let grid = matrix.Matrix;
            assert.isNotFalse(grid[0][0])
        })
        it("Has Objects as values",()=>{
            let matrix = new Grid(10);
            let grid = matrix.Matrix;
    
            grid.map((rows)=>{
                rows.map((row)=>{
                    assert.isObject(row)
                })
            })
            
        })
        it("Sizes are correct",()=>{
            let matrix = new Grid(10);
            let grid = matrix.Matrix;
    
            assert.strictEqual(grid[0][0].position[0],0)
            assert.strictEqual(grid[1][0].position[0],10)
            assert.strictEqual(grid[9][0].position[0],90)
            assert.strictEqual(grid[0][9].position[1],90)
            
        })
    
     
    })
    
    describe("Shape",()=>{
        //shape exists
        //get random shape
        //adding a shape
        it("Shape exists and is object",()=>{
            let matrix = new Grid(10);
            let grid = matrix.Matrix;
            let shape = matrix.Shape;

            assert.isNotFalse(shape);
            assert.isNotNull(shape);
            assert.isNotNaN(shape);
            assert.isObject(shape);
           
        })
        it("Shape exists in grid",()=>{
            let matrix = new Grid(10);
            let grid = matrix.Matrix;
            let shape = matrix.Shape;

        let coordinates = matrix.ShapeCoordinates
        let countTrues = 0
        let positions = []
        grid.map(rows=>{
            rows.map(row=>{
                if(row.exists){
                        countTrues++
                        positions.push(row.position)
                }
            })
        })
        assert.equal(4,countTrues)
        assert.equal(4, positions.length)
        assert.isArray(positions[0])
        assert.isArray(positions[1])
        assert.isArray(positions[2])
        assert.isArray(positions[3])
        assert.isArray(coordinates)

        })
  

        //moving a shape right
        // moving a shape down
        //flip a shape
        //check boundaries
    })
})

describe("Moves",()=>{
   
            //moving a shape left
            it("Move the shape left",()=>{
                let size = 20
            let grid = new Grid(size)
            let previousCoordinates = grid.ShapeCoordinates
            let previousPositions = []
            grid.matrix.map(rows=>{
                rows.map(row=>{
                    if(row.exists){
                            previousPositions.push(row.position)
                    }
                })
            })

            grid.moveLeft()

            let nextCoordinates = grid.ShapeCoordinates
            let nextPositions = []
            grid.Matrix.map(rows=>{
                rows.map(row=>{
                    if(row.exists){
                            nextPositions.push(row.position)
                    }
                })
            })
       
            console.log(grid.Shape.color)
            console.log("previousPositions: ",previousPositions," nextPositions: ",nextPositions)
            assert.equal(previousPositions[0][0]-size,nextPositions[0][0])
            assert.equal(previousPositions[0][1],nextPositions[0][1])
            assert.equal(previousPositions[1][0]-size,nextPositions[1][0])
            assert.equal(previousPositions[1][1],nextPositions[1][1])
            assert.equal(previousPositions[2][0]-size,nextPositions[2][0])
            assert.equal(previousPositions[2][1],nextPositions[2][1])
            assert.equal(previousPositions[3][0]-size,nextPositions[3][0])
            assert.equal(previousPositions[3][1],nextPositions[3][1])


            assert.equal(previousCoordinates[0]-1,nextCoordinates[0])
            assert.equal(previousCoordinates[1],nextCoordinates[1])

            
            
            })

            //moving a shape rigth
            it("Move the shape rigth",()=>{
                let size = 20
            let grid = new Grid(size)
            let previousCoordinates = grid.ShapeCoordinates
            let previousPositions = []
            grid.matrix.map(rows=>{
                rows.map(row=>{
                    if(row.exists){
                            previousPositions.push(row.position)
                    }
                })
            })

            grid.moveRigth()

            let nextCoordinates = grid.ShapeCoordinates
            let nextPositions = []
            grid.Matrix.map(rows=>{
                rows.map(row=>{
                    if(row.exists){
                            nextPositions.push(row.position)
                    }
                })
            })
         
            console.log(grid.Shape.color)
            console.log("previousPositions: ",previousPositions," nextPositions: ",nextPositions)
            assert.equal(previousPositions[0][0]+size,nextPositions[0][0])
            assert.equal(previousPositions[0][1],nextPositions[0][1])
            assert.equal(previousPositions[1][0]+size,nextPositions[1][0])
            assert.equal(previousPositions[1][1],nextPositions[1][1])
            assert.equal(previousPositions[2][0]+size,nextPositions[2][0])
            assert.equal(previousPositions[2][1],nextPositions[2][1])
            assert.equal(previousPositions[3][0]+size,nextPositions[3][0])
            assert.equal(previousPositions[3][1],nextPositions[3][1])


            assert.equal(previousCoordinates[0]+1,nextCoordinates[0])
            assert.equal(previousCoordinates[1],nextCoordinates[1])

            
            
            })

            it("Move the shape down",()=>{
                let size = 20
            let grid = new Grid(size)
            let previousCoordinates = grid.ShapeCoordinates
            let previousPositions = []
            grid.matrix.map(rows=>{
                rows.map(row=>{
                    if(row.exists){
                            previousPositions.push(row.position)
                    }
                })
            })

            grid.moveDown()

            let nextCoordinates = grid.ShapeCoordinates
            let nextPositions = []
            grid.Matrix.map(rows=>{
                rows.map(row=>{
                    if(row.exists){
                            nextPositions.push(row.position)
                    }
                })
            })
       
            console.log(grid.Shape.color)
            console.log("previousPositions: ",previousPositions," nextPositions: ",nextPositions)
            assert.equal(previousPositions[0][0],nextPositions[0][0])
            assert.equal(previousPositions[0][1]+size,nextPositions[0][1])
            assert.equal(previousPositions[1][0],nextPositions[1][0])
            assert.equal(previousPositions[1][1]+size,nextPositions[1][1])
            assert.equal(previousPositions[2][0],nextPositions[2][0])
            assert.equal(previousPositions[2][1]+size,nextPositions[2][1])
            assert.equal(previousPositions[3][0],nextPositions[3][0])
            assert.equal(previousPositions[3][1]+size,nextPositions[3][1])


            assert.equal(previousCoordinates[0],nextCoordinates[0])
            assert.equal(previousCoordinates[1]+1,nextCoordinates[1])

            
            
            })
})

describe("Extras",()=>{
    it("random numbers",()=>{
        let id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)
id = Math.floor(Math.random()*7)
assert.isBelow(id,7)

})
})