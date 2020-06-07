import {getPixels} from "./imageUtils.js"

export default () => {
    
    let img = null;
    let dirty = true;
    let canvas = null;

    return e => {

        const displayPalette = palette => {
            const h = e.height
            const w = e.width
            const rectW = w/palette.length
            palette.forEach((color, i) => {
                e.fill(color)
                e.stroke(color)
                const origin = rectW * i
                e.rect(origin, 0, rectW, h)
            })
        }

        const calculatePalette = pixels => {
            const palette = {}
            pixels.forEach(p => {
                const [r,g,b] = [p[0], p[1], p[2]]
                const s = [r,g,b].reduce((p,c) => p + c.toString(), '')
                if (!(s in palette)) {
                    palette[s] = e.color(r,g,b)
                }
            })
            return Object.values(palette)
        }

        e.newImage = function(i) {
            img = i;
        }
        
        e.fitToParent = function() {
            const {width} = canvas.parent().getBoundingClientRect()
            if (width != canvas.width) {
                canvas.resize(width, 40) 
            }
        }

        e.setup = function() {
            canvas = e.createCanvas(300, 40)
            e.fitToParent()
        }
        
        e.draw = function() {
            if (dirty && img != null) {
                img.loadPixels()
                displayPalette(calculatePalette(getPixels(img)))
                dirty = false;
            } e.fitToParent()
        }
    }
}