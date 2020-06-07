import { quantiseImage } from "./dither.js";

const quantised_image = (img_src) => {
    return function(e) {

        let img = null;
        
        e.preload = function() {
            img = e.loadImage(img_src)
        }

        e.setup = function() {
            e.createCanvas(img.width, img.height)
        }
        
        e.draw = function() {
            e.image(quantiseImage(img), 0,0)
        }

        return e
    }
}

export default quantised_image
