import {floyd_steinberg_gen} from "./dither.js"

export default (img_src, preProcessingFilters = [], postProcessingFilters = []) => {
    
    let img = null;
    let generator = null;
    let canvas = null;

    let getCanvasDimensions = () => canvas.parent().getBoundingClientRect()

    return e => {
        
        e.redrawListeners = []
        e.addRedrawListener = function(l) {
            e.redrawListeners.push(l)
        }

        e.preload = function() {
            img = e.loadImage(img_src)
        }

        e.setup = function() {
            canvas = e.createCanvas(100, 100)
            img = preProcessingFilters.reduce((res, f) => f(res), img)
            generator = floyd_steinberg_gen(img.get())
            e.frameRate(10)
        }
        
        e.draw = function() {
            
            const {done, value} = generator.next()
            if (done) {
                generator = floyd_steinberg_gen(img.get())
            }
            const {x, y, img: _img, oldColor, newColor} = value
            e.background(e.color(255,255,255))
            const postProcessedImage = postProcessingFilters.reduce((res, f) => f(res), _img)
            postProcessedImage.resize(getCanvasDimensions().width, 0)
            e.resizeCanvas(getCanvasDimensions().width, postProcessedImage.height)
            e.image(postProcessedImage, 0,0)
            e.redrawListeners.forEach(l => {
                l(img.get(), x, y, oldColor, newColor)
            })
        }
    }
}