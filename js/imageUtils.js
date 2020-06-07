/**
 * Converts a two dimensional pixel location to one dimensional pixel array location
 * @param {int} x the x of the requested index
 * @param {int} y the y of the requested index
 * @param {int} w the width of the image
 * @returns {int} The linear index
 */
const linearIndex = (x,y,w) => (x + y * w) * 4

/**
 * Gets the RGB values of the pixel at index i
 * @param {[int]} pixels the array of pixels
 * @param {*} i the index of the pixel to get
 * @returns {[int]} RGB values
 */
const rgbAt = (pixels, i) => [pixels[i], pixels[i+1], pixels[i+2]]

/**
 * Sets a pixel in the given image to the values provided, at the given coordinates 
 * @param {p5.Image} img the image to set the pixel of
 * @param {int} x the x coordinate of the pixel to set
 * @param {int} y the y coordinate of the pixel to set
 * @param {[int]} rgb the RGB values to assign to the pixel
 */
export const setPixel = img => (x, y, rgba) => {
    const w = img.width
    const i = linearIndex(x,y,w)
    const pixels = img.pixels
    pixels[i + 0] = rgba[0]
    pixels[i + 1] = rgba[1]
    pixels[i + 2] = rgba[2]
    if (rgba.length > 3)
        pixels[i + 3] = rgba[3]
}

/**
 * 
 * @param {p5.Image} img the image to get the pixel from
 * @param {int} x the x of the pixel to get
 * @param {int} y the y of the pixel to get
 */
export const getPixel = img => (x,y) => {
    const w = img.width
    const i = linearIndex(x,y,w)
    const pixels = img.pixels
    return rgbAt(pixels, i)
}

/**
 * Returns an array of pixels from the image
 * @param {p5.Image} img 
 * @returns [[int]] pixels
 */
export const getPixels = img => {
    const pxs = []
    const _getPixel = getPixel(img)
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            pxs.push(_getPixel(x,y))
        }
    }
    return pxs
}

const mapPixels = img => f => {
    const _getPixel = getPixel(img)
    const _setPixel = setPixel(img)
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            const p = _getPixel(x,y)
            _setPixel(x, y, f(p))
        }
    }
    img.updatePixels()
    return img
}

const redFilter = pix => [255, 0, 0, pix[0]]
const greenFilter = pix => [0, 255, 0, pix[1]]
const blueFilter = pix => [0, 0, 255, pix[2]]

export const redChannelOnly = img => mapPixels(img)(redFilter)
export const greenChannelOnly = img => mapPixels(img)(greenFilter)
export const blueChannelOnly = img => mapPixels(img)(blueFilter)
