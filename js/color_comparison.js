export default () => {
    
    let img = null;
    let dirty = true;
    let canvas = null;
    let [oldColor,newColor] = [null, null]

    return e => {

        function displayComparison() {
            const [h, w] = [img.height, img.width]
            const [oR, oG, oB] = oldColor
            const [nR, nG, nB] = newColor
            
            const textInset = 10
            e.textSize(15)
            e.textAlign(e.CENTER, e.CENTER)

            e.fill(e.color(oR, oG, oB))
            e.rect(0,0,(w/2)*4, h*4)
            e.fill(e.color(nR, nG, nB))
            e.rect((w/2)*4,0,(w/2)*4, h*4)

            e.fill(e.color(255,255,255))
            e.text(`r: ${oR}\ng: ${oG}\nb: ${oB}`, textInset, 0, (w/2)*4 - textInset*2, h*4 - textInset*2)
            e.text(`r: ${nR}\ng: ${nG}\nb: ${nB}`, (w/2)*4 + textInset, 0, (w/2)*4 - textInset*2, h*4 - textInset*2)
        }

        e.newImage = function(i, x, y, _oldColor, _newColor) {
            img = i;
            oldColor = _oldColor
            newColor = _newColor
            dirty = true;
        }
        
        e.draw = function() {
            if (dirty && img != null) {
                img.loadPixels()
                dirty = false;
                e.resizeCanvas(img.height*4, img.width*4)
                displayComparison()
            } 
        }
    }
}