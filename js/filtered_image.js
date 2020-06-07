
export default (img_src, filters) => {
    let img = null;
    let dirty = true;

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
        }
        
        e.draw = function() {
            if (dirty) {
                img = filters.reduce((res, f) => f(res), img)
                e.resizeCanvas(img.width, img.height)
                e.image(img, 0,0)
                dirty = false;
                e.redrawListeners.forEach(l => {
                    l(img)
                })
            }
        }
    }
}