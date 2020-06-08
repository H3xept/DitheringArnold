// import {getPixel, setPixel} from "./imageUtils"

// function antialiasedCopy(img, ox, oy, w, h) {
//     img.loadPixels()
//     const pxs = []
//     const _getPixel = getPixel(img)
//     for (let y = oy; y < h; y++) {
//         for (let x = ox; x < w; x++) {
//             pxs.push(_getPixel(x,y))
//         }
//     }

//     img.resize(w, 0)
//     const _setPixel = setPixel(img)
//     for (let y = oy; y < h; y++) {
//         for (let x = ox; x < w; x++) {
//             _setPixel(x,y, pxs[x + w * y])
//         }
//     }
//     return
// }

export const mighty_arm = img => img.get(162,0,87,87)
export const firm_bottom = img => img.get(101,133,87,87)
export const x2 = img => {img.resize(img.width * 2, 0); return img;}
export const x4 = img => {img.resize(img.width * 4, 0); return img;}
export const halven = img => {img.resize(img.width * 0.5, 0); return img;}