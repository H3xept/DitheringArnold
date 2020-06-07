import {getPixels} from "./imageUtils.js"

export default () => {
    
    let img = null;
    let dirty = true;
    let canvas = null;
    let getParentDimensions = () => canvas.parent().getBoundingClientRect()

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

        e.setup = function() {
            canvas = e.createCanvas(100, 40)
        }
        
        e.draw = function() {
            if (dirty && img != null) {
                e.resizeCanvas(getParentDimensions().width, canvas.height)
                img.loadPixels()
                displayPalette(calculatePalette(getPixels(img)))
                dirty = false;
            }
        }
    }
}