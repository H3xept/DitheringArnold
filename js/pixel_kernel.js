import {getPixels, getPixel} from "./imageUtils.js"

export default () => {
    
    let img = null;
    let dirty = true;
    let canvas = null;
    let [currX,currY] = [0,0]

    let getCanvasDimensions = () => canvas.parent().getBoundingClientRect()
    let getImageAspectRatio = () => img.height / img.width;

    return e => {

        function displayPixels() {

            img.loadPixels()
            const pixPerRow = 3
            const {width: parentWidth} = getCanvasDimensions()
            const [h,w] = [parentWidth * getImageAspectRatio(), parentWidth]
            const [rH, rW] = [h/(pixPerRow), w/(pixPerRow)]
            const textInset = 10
            const _getPixel = getPixel(img)

            e.textSize(10)
            e.textAlign(e.CENTER, e.CENTER)
            for (let y = 0; y < pixPerRow; y++) {
                for (let x = ''; x < pixPerRow; x++) {
                    const [r,g,b] = _getPixel(currX + (x-1), currY + (y-1))
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
                    e.stroke(e.color(255,255,255))
                    e.fill(e.color(0,0,0,0))
                    if (x == 2 && y == 1) e.text(`e0`, x*rW + textInset, y*rH + textInset, rW - textInset*2, rH - textInset*2)
                    if (x == 0 && y == 2) e.text(`e1`, x*rW + textInset, y*rH + textInset, rW - textInset*2, rH - textInset*2)
                    if (x == 1 && y == 2) e.text(`e2`, x*rW + textInset, y*rH + textInset, rW - textInset*2, rH - textInset*2)
                    if (x == 2 && y == 2) e.text(`e3`, x*rW + textInset, y*rH + textInset, rW - textInset*2, rH - textInset*2)
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