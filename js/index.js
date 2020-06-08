import filtered_image from "./filtered_image.js"
import color_palette from "./color_palette.js"
import dithered_image_gen from "./dithered_image_gen.js"
import {floyd_steinberg, quantiseImage} from "./dither.js"
import {mighty_arm, firm_bottom, x2, halven} from "./arnold_crop_utilities.js"
import {redChannelOnly, greenChannelOnly, blueChannelOnly} from "./imageUtils.js"
import pixel_kernel from "./pixel_kernel.js"
import color_comparison from "./color_comparison.js"

const header_image = new p5(filtered_image('./img/arnold.jpg', [floyd_steinberg]), document.getElementById('header_image'));

// Quantisation visualisation
const qv_original = new p5(filtered_image('./img/arnold.jpg', [mighty_arm, x2]), document.getElementById('qv_original'));
const qv_quantised = new p5(filtered_image('./img/arnold.jpg', [mighty_arm, x2, quantiseImage(2)]), document.getElementById('qv_quantised'));
const qv_quantised_4 = new p5(filtered_image('./img/arnold.jpg', [mighty_arm, x2, quantiseImage(3)]), document.getElementById('qv_quantised_4'));
const qv_quantised_8 = new p5(filtered_image('./img/arnold.jpg', [mighty_arm, x2, quantiseImage(4)]), document.getElementById('qv_quantised_8'));
// Color Palettes
const qv_original_cp = new p5(color_palette(), document.getElementById('qv_original_cp'));
const qv_quantised_cp = new p5(color_palette(), document.getElementById('qv_quantised_cp'));
const qv_quantised_4_cp = new p5(color_palette(), document.getElementById('qv_quantised_4_cp'));
const qv_quantised_8_cp = new p5(color_palette(), document.getElementById('qv_quantised_8_cp'));
// Algoritm visualisation
const av_firm_bottom = new p5(dithered_image_gen('./img/arnold.jpg', [firm_bottom], []), document.getElementById('firm_bottom'));
const av_kernel = new p5(pixel_kernel(), document.getElementById('av_kernel'))
const av_color_comparison = new p5(color_comparison(), document.getElementById('av_color_comparison'))
// Quantised RGB channels
const q_channel_r = new p5(filtered_image('./img/arnold.png', [quantiseImage(2), redChannelOnly]), 'q_channel_r');
const q_channel_g = new p5(filtered_image('./img/arnold.png', [quantiseImage(2), greenChannelOnly]), 'q_channel_g');
const q_channel_b = new p5(filtered_image('./img/arnold.png', [quantiseImage(2), blueChannelOnly]), 'q_channel_b');
// Dithered RGB channels
const d_channel_r = new p5(filtered_image('./img/arnold.png', [floyd_steinberg, redChannelOnly]), 'd_channel_r');
const d_channel_g = new p5(filtered_image('./img/arnold.png', [floyd_steinberg, greenChannelOnly]), 'd_channel_g');
const d_channel_b = new p5(filtered_image('./img/arnold.png', [floyd_steinberg, blueChannelOnly]), 'd_channel_b');

qv_original.addRedrawListener(qv_original_cp.newImage);
qv_quantised.addRedrawListener(qv_quantised_cp.newImage);
qv_quantised_4.addRedrawListener(qv_quantised_4_cp.newImage);
qv_quantised_8.addRedrawListener(qv_quantised_8_cp.newImage);

av_firm_bottom.addRedrawListener(av_kernel.newImage);
av_firm_bottom.addRedrawListener(av_color_comparison.newImage);
