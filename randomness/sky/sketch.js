let music;
let playButton;
let quote;
let p;
let div;
let credit;
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let luminance;
let hue;
let offset = 0.0;

function preload() {
   music = loadSound("./piano-438549.mp3");
}

function setup() {

    createCanvas(canvasWidth, canvasHeight);
    frameRate(144)
    colorMode(HSL);
    loadPixels();
    div = createDiv();
    quote = createP('"The sky is the ultimate art gallery just above us.<br>— Ralph Waldo Emerson"');
    playButton = createButton("▶");
    p = createP("Watch as the clouds move slowly.<br>Press the play button to hear some music!")
    credit = createP('Music by <a href="https://pixabay.com/users/nikitakondrashev-42823964/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=438549">Nikita Kondrashev</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=438549">Pixabay</a>')

    quote.parent(div);
    playButton.parent(div);
    p.parent(div);
    credit.parent(div);

  div.style("display", "flex");
  div.style("flex-direction", "column");
  div.style("align-items", "center");
  div.style("justify-content", "center");
  div.style("position", "absolute");
  div.style("left", "50%");
  div.style("top", "50%");
  div.style("transform", "translate(-50%, -50%)");

  quote.style("font-size", "32px");
  quote.style("text-align", "center");
  

  playButton.style("font-size", "20px");
  playButton.style("text-align", "center");
  playButton.style("border", "none");
  playButton.style("border-bottom", "solid #0B5563");
  playButton.style("width",'32px')
  playButton.style("height",'32px')
  playButton.style("background", "none");
  playButton.mousePressed(toggleMusic);
  
  p.style("text-align", "center");
  

  
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

function toggleMusic() {
  if (music.isPlaying()) {
    music.pause();
    playButton.html("▶");
  } else {
    music.loop();
    playButton.html("⏸");
  }
}