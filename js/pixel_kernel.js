import {getPixels} from "./imageUtils.js"

export default () => {
    
    let img = null;
    let dirty = true;
    let canvas = null;
    let [currX,currY] = [0,0]

    return e => {

        function displayPixels() {
            const subimg = img.get(currX-1,currY-1, 3,3)
            subimg.loadPixels()
            const pxs = getPixels(subimg)
            const pixPerRow = pxs.length/3
            const [h,w] = [img.height, img.width]
            const [rH, rW] = [h/(pixPerRow), w/(pixPerRow)]
            const textInset = 10
            e.textSize(10)
            e.textAlign(e.CENTER)
            for (let y = 0; y < pixPerRow; y++) {
                for (let x = 0; x < pixPerRow; x++) {
                    const [r,g,b] = pxs[x + y]
                    e.stroke(e.color(0,0,0))
                    e.fill(e.color(r,g,b))
                    e.rect(x*rW*4, y*rH*4, rW*4, rH*4)
                    if (x == 1 && y == 1) { // Red middle
                        const inset = 4 //pixels
                        e.stroke(e.color(255,0,0))
                        e.fill(e.color(0,0,0,0))
                        e.rect(x*rW*4 + inset, y*rH*4 + inset, rW*4 - inset*2, rH*4 - inset*2)
                        e.stroke(e.color(255,255,255))
                        e.text(`r: ${r}\ng: ${g}\nb: ${b}`, x*rW*4 + textInset, y*rH*4 + textInset, rW*4 - textInset*2, rH*4 - textInset*2)
                    }
                }
            }
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
                e.resizeCanvas(img.height*4, img.width*4)
                displayPixels()
            } 
        }
    }
}