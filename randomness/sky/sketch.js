const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let luminance;
let hue;
let offset = 0.0;

function setup() {

    createCanvas(canvasWidth, canvasHeight);
    frameRate(480)
    colorMode(HSL);
    loadPixels();

// b&w noise
    // let xoff = 0.0;

    // for (let x = 0; x < width; x++) {
    //     let yoff = 0.0;
    //     for (let y = 0; y < height; y++) {
    //         const luminance = map(noise(xoff, yoff), 0, 1, 0, 255);
    //         set(x, y, floor(luminance));
    //         yoff += 0.01;
    //     }
    //     xoff += 0.01;
    // }
    // updatePixels();
    
}
function draw() {
    offset += 0.01
    console.log(offset)
    let xoff = 0.0 + offset;

    for (let x = 0; x < width; x++) {
        let yoff = 0.0+offset;
        for (let y = 0; y < height; y++) {
            //luminance = map(noise(xoff, yoff), 0, 1, 0, 100);
            // hue = map(noise(xoff, yoff), 0, 1, 0, 360);
            luminance = map(noise(xoff, yoff), 0, 1, 40, 110);// max over 10 from max limit of l to make pure white "the sun behind cloud" effect
            hue = map(noise(xoff, yoff), 0, 1, 192, 220);
            saturation = map(noise(xoff, yoff), 0, 1, 100, 80);
            // pixelColor = color(hue,100,luminance);
            pixelColor = color(hue,saturation,luminance);
            set(x, y, pixelColor);
            yoff += 0.01;
        }
        xoff += 0.01;
    }
    updatePixels();
}