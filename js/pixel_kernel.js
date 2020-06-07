import {getPixels} from "./imageUtils.js"

export default () => {
    
    let img = null;
    let dirty = true;
    let canvas = null;
    let [currX,currY] = [0,0]

    let getCanvasDimensions = () => canvas.parent().getBoundingClientRect()
    let getImageAspectRatio = () => img.height / img.width;

    return e => {

        function displayPixels() {

            const subimg = img.get(currX-1, currY-1, 3,3)
            subimg.loadPixels()
            const pxs = getPixels(subimg)
            const pixPerRow = pxs.length/3
            const {width: parentWidth} = getCanvasDimensions()
            const [h,w] = [parentWidth * getImageAspectRatio(), parentWidth]
            const [rH, rW] = [h/(pixPerRow), w/(pixPerRow)]
            const textInset = 10
            e.textSize(10)
            e.textAlign(e.CENTER, e.CENTER)
            for (let y = 0; y < pixPerRow; y++) {
                for (let x = 0; x < pixPerRow; x++) {
                    const [r,g,b] = pxs[x + y * pixPerRow]
                    e.stroke(e.color(0,0,0))
                    e.fill(e.color(r,g,b))
                    e.rect(x*rW, y*rH, rW, rH)
                    if (x == 1 && y == 1) { // Red middle
                        const inset = 4 //pixels
                        e.stroke(e.color(255,0,0))
                        e.fill(e.color(0,0,0,0))
                        e.rect(x*rW + inset, y*rH + inset, rW - inset*2, rH - inset*2)
                        e.stroke(e.color(255,255,255))
                        e.text(`r: ${r}\ng: ${g}\nb: ${b}`, x*rW + textInset, y*rH + textInset, rW - textInset*2, rH - textInset*2)
                    }
                }
            }
        }

        e.setup = function() {
            canvas = e.createCanvas(100,100)
        }

        e.newImage = function(i, x, y) {
            img = i;
            currX = x
            currY = y
            dirty = true;
        }
        
        e.draw = function() {
            if (dirty && img != null) {
                img.loadPixels()
                dirty = false;
                
                const {width} = getCanvasDimensions()
                e.resizeCanvas(width * getImageAspectRatio(), width)
                displayPixels()
            } 
        }
    }
}