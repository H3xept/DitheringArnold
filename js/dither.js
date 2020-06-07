import { getPixel, setPixel } from "./imageUtils.js";

/**
 * @param {int} max the max value of the value to quantise
 * @param {int} v the value to quantise
 * @param {int} buckets the number of quantisation steps
 * @returns {int} the quantised value
 */
const quantise = (max = 255) => (v, buckets = 2) => 
    Math.round(((v/max) * (buckets - 1))) * (max/(buckets - 1))

/**
 * Pairwise adds elements in aa to elements in bb
 * @param {[number]} aa the first array
 * @param {[number]} bb the second array
 * @returns {[number]} the resulting sums array
 */
const zipSum = (aa, bb) => aa.map((a, i) => a + bb[i]) 

/**
 * Dithers a p5.js image with Floyd-Steinberg's algorithm
 * @param {p5.Image} img the image to dither
 * @param {int} e1 the weight for the propagation of error 1
 * @param {int} e2 the weight for the propagation of error 2
 * @param {int} e3 the weight for the propagation of error 3
 * @param {int} e4 the weight for the propagation of error 4
 * @param {int} quantSteps the quantization steps to use for color palette quantization 
 * @returns {p5.Image} the dithered image
 */
export const floyd_steinberg = (img, e1 = 7, e2 = 3, e3 = 5, e4 = 1, quantSteps = 2) => {
    img.loadPixels()

    const [w, h] = [img.width, img.height]
    const _setPixel = setPixel(img)
    const _getPixel = getPixel(img)
    const _quantise = quantise(255)

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {    
            const [oldR, oldG, oldB] = _getPixel(x,y)
            const [newR, newG, newB] = [oldR, oldG, oldB].map(e => _quantise(e, quantSteps))
            const errors = [oldR-newR, oldG-newG, oldB-newB]
            _setPixel(x, y, [newR, newG, newB])
            
            // Propagate quantisation errors
            // https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering
            _setPixel(x + 1, y, zipSum(_getPixel(x + 1, y), errors.map(e => e*(e1/16))))
            _setPixel(x - 1, y + 1, zipSum(_getPixel(x - 1, y + 1), errors.map(e => e*(e2/16))))
            _setPixel(x , y + 1, zipSum(_getPixel(x, y + 1), errors.map(e => e*(e3/16))))
            _setPixel(x + 1, y + 1, zipSum(_getPixel(x + 1, y + 1), errors.map(e => e*(e4/16))))
        }
    }
    img.updatePixels()
    return img
}

export const floyd_steinberg_gen = function*(img, e1 = 7, e2 = 3, e3 = 5, e4 = 1, quantSteps = 2) {
    img.loadPixels()

    const [w, h] = [img.width, img.height]
    const _setPixel = setPixel(img)
    const _getPixel = getPixel(img)
    const _quantise = quantise(255)

    
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            
            const [oldR, oldG, oldB] = _getPixel(x,y)
            console.log(x,y,oldR, oldG, oldB)
            if (oldR === 0 && oldG === 0 && oldB === 0) continue;

            const [newR, newG, newB] = [oldR, oldG, oldB].map(e => _quantise(e, quantSteps))
            const errors = [oldR-newR, oldG-newG, oldB-newB]
            _setPixel(x, y, [newR, newG, newB])
            
            // Propagate quantisation errors
            // https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering
            _setPixel(x + 1, y, zipSum(_getPixel(x + 1, y), errors.map(e => e*(e1/16))))
            _setPixel(x - 1, y + 1, zipSum(_getPixel(x - 1, y + 1), errors.map(e => e*(e2/16))))
            _setPixel(x , y + 1, zipSum(_getPixel(x, y + 1), errors.map(e => e*(e3/16))))
            _setPixel(x + 1, y + 1, zipSum(_getPixel(x + 1, y + 1), errors.map(e => e*(e4/16))))
            
            // Very inefficient but this is just for demonstration purposes
            img.updatePixels()
            yield {x, y, img:img.get(), newColor:[newR, newG, newB], oldColor:[oldR, oldG, oldB]}
        }
    }
    img.updatePixels()
    return img
}

export const quantiseImage = (img, reducedColorPalette = 2) => {
    img.loadPixels()

    const [w, h] = [img.width, img.height]
    const _setPixel = setPixel(img)
    const _getPixel = getPixel(img)
    const _quantise = quantise(255)

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const [oldR, oldG, oldB] = _getPixel(x,y)
            const [newR, newG, newB] = [oldR, oldG, oldB].map(e => _quantise(e, reducedColorPalette))
            _setPixel(x, y, [newR, newG, newB])
        }
    }
    img.updatePixels()
    return img
}
