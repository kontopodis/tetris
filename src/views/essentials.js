import * as PIXI from 'pixi.js'
export const Background = (globals) =>{

const width = globals.width
const height = globals.height
const boxes = globals.boxes
const lines = globals.lines

    const background = new PIXI.Graphics()


    background.lineStyle(1,0x777777,1)
    background.beginFill(0x333333)
    for (let i=0; i<=lines;i++){

        for (let j = 0; j<=12;j++){
            background.drawRect(j*boxes,i*boxes,boxes,boxes)
        }
    }
  
    const label = new PIXI.Text("TETRIS",style)
    label.x = (width - label.width)/2
    label.y = 7
    background.endFill()
    background.lineStyle(1,0x000000,1)
    background.beginFill(0x222222)

    background.drawRect(0,0,12,height)
    background.drawRect(width-12,0,12,height)

    background.drawRect(0,0,width,12)
    background.drawRect(label.x-20,0,label.width+40,label.height+10)
    background.endFill()



    background.addChild(label)
    return background;

}

export const buttonLeft = (globals) =>{

const width = globals.width
const height = globals.height
const boxes = globals.boxes
const lines = globals.lines

const middle = (3*boxes/2)

    const button  = new PIXI.Graphics()

    button.lineStyle(2,0x999999,1)
    button.beginFill(0x222222)
    button.moveTo(15,middle)
    button.lineTo(65,middle-30)
    button.lineTo(65,middle+30)
    button.lineTo(15,middle)
    button.endFill()


    return button
}


export const buttonRight = (globals) =>{

    const width = globals.width
    const height = globals.height
    const boxes = globals.boxes
    const lines = globals.lines
    
    const middle = (3*boxes/2)
        const button  = new PIXI.Graphics()
    
        button.lineStyle(2,0x999999,1)
        button.beginFill(0x222222)
        button.moveTo(120,middle)
        button.lineTo(70,middle-30)
        button.lineTo(70,middle+30)
        button.lineTo(120,middle)
        button.endFill()
    
        return button
    }

export const buttonTurn = (globals) =>{

        const width = globals.width
        const height = globals.height
        const boxes = globals.boxes
        const lines = globals.lines
        
        const middle = (3*boxes/2)
      
            const button  = new PIXI.Graphics()
        
            button.lineStyle(2,0x999999,1)     
            button.beginFill(0x222222)     
        button.drawCircle(width-50,middle,30,Math.PI) 
        button.endFill()
        button.arc(width-50,middle,20,2 * Math.PI, 2.5 * Math.PI / 2)       
        
            return button
        }

export const buttonDown = (globals) =>{

            const width = globals.width
            const height = globals.height
            const boxes = globals.boxes
            const lines = globals.lines
            
            const middle = (3*boxes/2)
           
                const button  = new PIXI.Graphics()
            
                button.lineStyle(2,0x999999,1)        
                button.beginFill(0x222222)  
            button.drawCircle(width-100,middle,20,Math.PI) 
            button.endFill()
            button.moveTo(width-100,middle-15)
            button.lineTo(width-100,middle+15,20,2 * Math.PI, 2.5 * Math.PI / 2)    
            button.lineTo(width-85,middle-5)     
            button.moveTo(width-100,middle+15)
            button.lineTo(width-115,middle-5)   
                return button
            }

export const Tetraminoe = (globals,color) =>{

    const width = globals.width
const height = globals.height
const boxes = globals.boxes
const lines = globals.lines

    const tetraminoe = new PIXI.Graphics()


    tetraminoe.lineStyle(1,0x777777,1)
    tetraminoe.beginFill(color)
    tetraminoe.drawRect(0,0,boxes,boxes)
    tetraminoe.endFill()
    return tetraminoe;
}

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#333333'], // gradient
    stroke: '#777777',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

