import {floyd_steinberg_gen} from "./dither.js"

export default (img_src, preProcessingFilters = [], postProcessingFilters = []) => {
    let img = null;
    let dirty = true;
    let generator = null;

    return e => {
        
        e.redrawListeners = []
        e.addRedrawListener = function(l) {
            e.redrawListeners.push(l)
        }

        e.preload = function() {
            img = e.loadImage(img_src)
        }

        e.setup = function() {
            e.createCanvas(img.width, img.height)
            img = preProcessingFilters.reduce((res, f) => f(res), img)
            generator = floyd_steinberg_gen(img.get())
            e.frameRate(1)
        }
        
        e.draw = function() {
            
            const {done, value} = generator.next()
            if (done) {
                generator = floyd_steinberg_gen(img.get())
            }
            const {x, y, img: _img, oldColor, newColor} = value
            e.background(e.color(255,255,255))
            const postProcessedImage = postProcessingFilters.reduce((res, f) => f(res), _img)
            e.resizeCanvas(postProcessedImage.width, postProcessedImage.height)
            e.image(postProcessedImage, 0,0)
            dirty = false;
            e.redrawListeners.forEach(l => {
                console.log(oldColor)
                l(img.get(), x, y, oldColor, newColor)
            })
        }
    }
}