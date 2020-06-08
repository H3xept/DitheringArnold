import {getPixel} from "./imageUtils.js"

/**
 * A p5 sketch to draw a 3x3 pixel kernel with some labels
 */
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
            // Rect Height|Width
            const [rH, rW] = [h/(pixPerRow), w/(pixPerRow)]
            const textInset = 10
            const _getPixel = getPixel(img)
            
            const redRectInset = 4
            e.textSize(10)
            e.textAlign(e.CENTER, e.CENTER)

            for (let y = 0; y < pixPerRow; y++) {
                for (let x = ''; x < pixPerRow; x++) {

                    // Draw color rect
                    // currX + (x-1) => since I need a 3x3 grid around the current pixel,
                    // and x and y are in range [0,1,2], I just subtract 1 at each iteration to
                    // get the range [-1, 0, 1] which + currX or currY gives me exactly the grid I need
                    const [r,g,b] = _getPixel(currX + (x-1), currY + (y-1))
                    e.stroke(e.color(0,0,0))
                    e.fill(e.color(r,g,b))
                    e.rect(x*rW, y*rH, rW, rH)

                    if (x == 1 && y == 1) { // Red middle
                        e.stroke(e.color(255,0,0))
                        e.fill(e.color(0,0,0,0))
                        e.rect(x*rW + redRectInset, y*rH + redRectInset, rW - redRectInset*2, rH - redRectInset*2)
                        e.stroke(e.color(255,255,255))
                        e.text(`r: ${r}\ng: ${g}\nb: ${b}`, x*rW + textInset, y*rH + textInset, rW - textInset*2, rH - textInset*2)
                    }
                    e.stroke(e.color(255,255,255))
                    e.fill(e.color(0,0,0,0))
                    
                    // e0 e1 e2 e3 labels
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