const canvasWidth = 4 * window.innerWidth/5;
const canvasHeight = 4 * window.innerHeight/5;
let distanceSlider;
let sizeSlider;
let hueSlider;
let hueAverageSlider;
let saturationSlider;
let luminanceSlider;
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSL);
  createAllSliders()
}

function draw() {
  x = randomGaussian(mouseX, distanceSlider.value());
  y = randomGaussian(mouseY, distanceSlider.value());
  size = randomGaussian(5, sizeSlider.value());
  // I was using gaussian for each rgb value, but using hsl may give me better results
  // r = randomGaussian(113, hueSlider.value());
  // g = randomGaussian(0, hueSlider.value());
  // b = randomGaussian(0, hueSlider.value());
  hue = randomGaussian(hueAverageSlider.value(), hueSlider.value());
  saturation = randomGaussian(50, saturationSlider.value());
  luminance = randomGaussian(50, luminanceSlider.value());
  fill(hue,saturation,luminance,30);
  noStroke();
  circle(x, y, size);
}

function createAllSliders() {
  let panel = select("#sliderPanel");

  function makeSlider(label, min, max, initial) {
    let labelP = createP(label);
    labelP.parent(panel);
    let slider = createSlider(min, max, initial);
    slider.parent(panel);
    return slider;
  }

  distanceSlider   = makeSlider("Distance's STD",   1, 50, 20);
  sizeSlider       = makeSlider("Size's STD",        0, 5, 1);
  hueSlider        = makeSlider("Hue's STD",         0, 180, 0);
  hueAverageSlider  = makeSlider("Hue's Average", 0, 360, 180);
  saturationSlider = makeSlider("Saturation's STD",  0, 50, 25);
  luminanceSlider  = makeSlider("Luminance's STD",   0, 50, 25);
}

