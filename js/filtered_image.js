
export default (img_src, filters) => {
    let img = null;
    let dirty = true;
    let canvas = null;

    let getParentDimensions = () => canvas.parent().getBoundingClientRect()

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
                
                // Responsive scaling
                const imgAspectRatio = img.height/img.width
                const parentW = getParentDimensions().width
                const scaled = img.get()
                e.resizeCanvas(parentW, parentW * imgAspectRatio)
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