import {getPixels} from "./imageUtils.js"

/**
 * p5js sketch to display a color palette in a linear form
 */
export default () => {
    
    let img = null;
    let dirty = true;
    let canvas = null;

    let getParentDimensions = () => canvas.parent().getBoundingClientRect()

    return e => {

        const displayPalette = palette => {
            const h = canvas.height
            const w = canvas.width
            const rectW = w/palette.length

            // Actual palette
            palette.forEach((color, i) => {
                e.fill(color)
                e.stroke(color)
                const origin = rectW * i
                e.rect(origin, 0, rectW, h)
            })
            
            // Border
            e.stroke(0,0,0, 255)
            e.fill(0,0,0,0)
            e.rect(0,0,w,h)
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

            console.log(Object.values(palette).length)
            return Object.values(palette).sort()
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