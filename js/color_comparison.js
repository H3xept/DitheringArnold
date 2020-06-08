import {getPixel} from "./imageUtils.js"

export default () => {
    
    let img = null;
    let dirty = true;
    let canvas = null;
    let [oldColor,newColor] = [null, null]
    let [currX, currY] = [0, 0]

    let getImageAspectRatio = () => img.height / img.width;
    let getParentDimensions = () => canvas.parent().getBoundingClientRect()

    return e => {

        function displayComparison() {
            const [originalR, originalG, originalB] = getPixel(img)(currX, currY)
            const {width:parentW} = getParentDimensions()
            const [h, w] = [getImageAspectRatio() * (parentW/2) , parentW]
            const [oR, oG, oB] = oldColor
            const [nR, nG, nB] = newColor
            
            const textInset = 2
            e.textSize(13)
            e.textAlign(e.CENTER, e.CENTER)

            // Original color
            e.fill(e.color(originalR, originalG, originalB))
            e.rect(0,0,(w/3), h)

            // Original color + quantised error
            e.fill(e.color(oR, oG, oB))
            e.rect((w/3),0,(w/3), h)

            // Final pixel color
            e.fill(e.color(nR, nG, nB))
            e.rect((2*w/3),0,(w/3), h)


            e.fill(e.color(255,255,255))
            e.textAlign(e.CENTER, e.CENTER)
            e.text(`r: ${originalR}\ng: ${originalG}\nb: ${originalB}`, textInset, 0, (w/3) - textInset*2, h - textInset*2)
            e.textAlign(e.CENTER, e.BOTTOM)
            e.text(`Original`, textInset, 0, (w/3) - textInset*2, h - textInset*2)
            e.textAlign(e.CENTER, e.CENTER)
            e.text(`r: ${oR}\ng: ${oG}\nb: ${oB}`, (w/3) + textInset, 0, (w/3) - textInset*2, h - textInset*2)
            e.textAlign(e.CENTER, e.BOTTOM)
            e.text(`Original + error`, (w/3) + textInset, 0, (w/3) - textInset*2, h - textInset*2)
            e.textAlign(e.CENTER, e.CENTER)
            e.text(`r: ${nR}\ng: ${nG}\nb: ${nB}`, (2*w/3) + textInset, 0, (w/3) - textInset*2, h - textInset*2)
            e.textAlign(e.CENTER, e.BOTTOM)
            e.text(`Final Color`, (2*w/3) + textInset, 0, (w/3) - textInset*2, h - textInset*2)
        }

        e.setup = function() {
            canvas = e.createCanvas(100,100)
        }

        e.newImage = function(i, x, y, _oldColor, _newColor) {
            img = i;
            oldColor = _oldColor
            newColor = _newColor
            dirty = true;
            currX = x
            currY = y
        }

        e.draw = function() {
            if (dirty && img != null) {
                img.loadPixels()
                dirty = false;
                const w = getParentDimensions().width
                e.resizeCanvas(w, getImageAspectRatio() * (w/2))
                displayComparison()
            } 
        }
    }
}