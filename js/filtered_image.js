
export default (img_src, filters) => {
    let img = null;
    let dirty = true;
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
            canvas = e.createCanvas(img.width, img.height)
        }
        
        e.draw = function() {
            if (dirty) {
                img = filters.reduce((res, f) => f(res), img)
                const imgAspectRatio = img.height/img.width
                const parentW = getCanvasDimensions().width
                e.resizeCanvas(parentW, parentW * imgAspectRatio)
                const scaled = img.get()
                scaled.resize(parentW, parentW * imgAspectRatio)
                e.image(scaled, 0,0)
                dirty = false;
                e.redrawListeners.forEach(l => {
                    l(img)
                })
            }
        }
    }
}