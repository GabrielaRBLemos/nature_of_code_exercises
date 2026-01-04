const canvasWidth = 2*window.innerWidth/3;
const canvasHeight = 1 * window.innerHeight/2;
let walker;
let container;
let selector;
let canvas;

function setup() {
  container = select('#container');
  
  canvas=createCanvas(canvasWidth, canvasHeight);
  canvas.parent(container);
  
  selector = createSelect();
  selector.parent(container);
  selector.option('4 Directions');
  selector.option('8 Directions');
  selector.option('Continuous');
  selector.option('Non Uniform (Right Bias)');
  selector.option('Dynamic (Move your cursor!)');
  selector.option('Gaussian');
  selector.option('Accept-Reject');
  selector.option('Noise');

  selector.changed(resetWalker);

  walker = new Walker(step4),10;

}

function draw() {
  walker.step();
  walker.show();
}

function resetWalker() {
  background(255);

  const mapStepFunctions = {
    'Gaussian': stepGaussian,
    '4 Directions': step4,
    '8 Directions': step8,
    'Continuous': stepContinuous,
    'Non Uniform (Right Bias)': stepNonUniform,
    'Dynamic (Move your cursor!)': stepDynamic,
    'Accept-Reject': stepAcceptReject,
    'Noise': stepNoise
  };
  walker = new Walker(mapStepFunctions[selector.value()]);
}

class Walker {
  constructor(stepFunction, diameter = 8) {
    canvas.clear()
    this.stepFunction = stepFunction;

    this.d = diameter;

    this.position = createVector(width / 2, height / 2);

    this.tx = 0;
    this.ty = 1000;
  }

  show() {
    // stroke(0);
    // point(this.position.x, this.position.y);

    noStroke();
    fill(56, 34, 8, 63)
    circle(this.position.x, this.position.y, this.d);
  }

  // step() {
  //   const { dx, dy } = this.stepFunction(this.position.x, this.position.y);
  //   this.position.x += dx;
  //   this.position.y += dy;
  // }

  step() {
    this.position.x = constrain(this.position.x, 0, canvasWidth);
    this.position.y = constrain(this.position.y, 0, canvasHeight);
    this.stepFunction(this);
  }
}

// const step4 = () => {
//   //== 4 directions https://natureofcode.com/random/#the-random-walker-class==
//   const r = floor(random(4));
//   if (r == 0) {
//     return { dx: 1, dy: 0 };
//   } else if (r == 1) {
//     return { dx: -1, dy: 0 };
//   } else if (r == 2) {
//     return { dx: 0, dy: 1 };
//   } else {
//     return { dx: 0, dy: -1 };
//   }
// }

const step4 = (walker) => {
//== 4 directions https://natureofcode.com/random/#the-random-walker-class==
  const r = floor(random(4));
  if (r === 0) walker.position.x += walker.d;
  else if (r === 1) walker.position.x -= walker.d;
  else if (r === 2) walker.position.y += walker.d;
  else walker.position.y -= walker.d;
};

// const step8 = () => {
//   //== 8 directions https://natureofcode.com/random/#the-random-walker-class==
//   return { dx: floor(random(3)) - 1, dy: floor(random(3)) - 1 }
// }

const step8 = (walker) => {
  walker.position.x += (floor(random(3)) - 1) * walker.d;
  walker.position.y += (floor(random(3)) - 1) * walker.d;
};

// const stepContinuous = () => {
//   //== Any direction (continuos range) https://natureofcode.com/random/#the-random-walker-class==
//   return { dx: random(-1,1), dy: random(-10,10)}
// }

const stepContinuous = (walker) => {
  //== Any direction (continuos range) https://natureofcode.com/random/#the-random-walker-class==
  walker.position.x += random(-walker.d, walker.d);
  walker.position.y += random(-walker.d, walker.d);
};

// const stepNonUniform = () => {
//   //== Biased to moving to the right (non uniform distribution) https://natureofcode.com/random/#probability-and-nonuniform-distributions==
//   const r = random(1);
//   if (r < 0.4) {
//   return { dx: 1, dy: 0 };
//   } else if (r < 0.6) {
//   return { dx: -1, dy: 0 };
//   } else if (r < 0.8) {
//   return { dx: 0, dy: 1 };
//   } else {
//   return { dx: 0, dy: -1 };
//   }
// }

const stepNonUniform = (walker) => {
  const r = random(1);
  if (r < 0.4) walker.position.x += walker.d;
  else if (r < 0.6) walker.position.x -= walker.d;
  else if (r < 0.8) walker.position.y += walker.d;
  else walker.position.y -= walker.d;
};


// const stepDynamic = (x,y) => {
//   //== 50% to moving towards the cursor (dynamic probabilities) https://natureofcode.com/random/#probability-and-nonuniform-distributions==
//   const r = random([0,1]);
//   if (r === 0) {
//     return {dx: x > mouseX ? -1 : 1, dy: y > mouseY ? -1 : 1};
//   }
//   else{
//     return { dx: random(-1,1), dy: random(-1,1)}
//   }
// }

const stepDynamic = (walker) => {
  //== 50% to moving towards the cursor (dynamic probabilities) https://natureofcode.com/random/#probability-and-nonuniform-distributions==
  const r = random([0, 1]);
  if (r === 0) {
    walker.position.x += walker.position.x > mouseX ? -walker.d : walker.d;
    walker.position.y += walker.position.y > mouseY ? -walker.d : walker.d;
  } else {
    walker.position.x += random(-walker.d, walker.d);
    walker.position.y += random(-walker.d, walker.d);
  }
};

// const stepGaussian = () =>{
//     //== steps generated with a normal distribution https://natureofcode.com/random/#a-normal-distribution-of-random-numbers==
//     return { dx:randomGaussian(0,1), dy:randomGaussian(0,1)}
// }

const stepGaussian = (walker) => {
  walker.position.x += round(randomGaussian()) * walker.d;
  walker.position.y += round(randomGaussian()) * walker.d;
};

// const stepAcceptReject = () =>{
//   //the longer the step, the less likely it is to be picked https://natureofcode.com/random/#a-custom-distribution-of-random-numbers//

//   return { dx: acceptRejectQuadratic(-1,1), dy: acceptRejectQuadratic(-1,1)}

// }

const stepAcceptReject = (walker) => {
  walker.position.x += round(acceptRejectQuadratic(-1, 1)) * walker.d;
  walker.position.y += round(acceptRejectQuadratic(-1, 1)) * walker.d;
};

acceptRejectQuadratic  = (min,max) =>{
  //(y=x*x)//
  let r1;
  let r2;
  do {
      r1 = random(min,max);
      r2 = random(min,max);

    }while (abs(r2) < r1*r1)
    return r1;
  }
// acceptRejectLinear  = (min,max) =>{
//   //(y=x)//
//   let r1;
//   let r2;
//   do {
//       r1 = random(min,max);
//       r2 = random(min,max);

//     }while (abs(r2) < abs(r1))
//     return r1;
//   }

  // const stepNoise = (walker) =>{
  //   //naturally ordered sequence of pseudorandom numbers for the steps https://natureofcode.com/random/#a-smoother-approach-with-perlin-noise//
  //   walker.position.x = map(noise(walker.tx), 0, 1, 0, width);
  //   walker.position.y = map(noise(walker.ty), 0, 1, 0, height);
  //   walker.tx += 0.005;
  //   walker.ty += 0.005;
  // }

  const stepNoise = (walker) =>{
    //naturally ordered sequence of pseudorandom numbers for the steps https://natureofcode.com/random/#a-smoother-approach-with-perlin-noise//
    walker.position.x = map(noise(walker.tx), 0, 1, walker.d, width);
    walker.position.y = map(noise(walker.ty), 0, 1, walker.d, height);
    walker.tx += 0.01;
    walker.ty += 0.01;
  }