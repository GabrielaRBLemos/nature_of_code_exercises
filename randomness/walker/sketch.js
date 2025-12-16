const canvasWidth = 4 * window.innerWidth/5;
const canvasHeight = 4 * window.innerHeight/5;
let walker;
let selector;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);

  selector = createSelect();
  selector.option('4 Directions');
  selector.option('8 Directions');
  selector.option('Continuous');
  selector.option('Non Uniform');
  selector.option('Dynamic');
  selector.option('Gaussian');
  selector.option('Accept-Reject');

  selector.changed(resetWalker);
  walker = new Walker(step4);

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
    'Non Uniform': stepNonUniform,
    'Dynamic': stepDynamic,
    'Accept-Reject': stepAcceptReject
  };
  walker = new Walker(mapStepFunctions[selector.value()]);
}

class Walker {
  constructor(stepFunction) {
    this.x = width / 2;
    this.y = height / 2;
    this.stepFunction = stepFunction;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    const { dx, dy } = this.stepFunction(this.x, this.y);
    this.x += dx;
    this.y += dy;
  }

}

const step4 = () => {
  //== 4 directions https://natureofcode.com/random/#the-random-walker-class==
  const r = floor(random(4));
  if (r == 0) {
    return { dx: 1, dy: 0 };
  } else if (r == 1) {
    return { dx: -1, dy: 0 };
  } else if (r == 2) {
    return { dx: 0, dy: 1 };
  } else {
    return { dx: 0, dy: -1 };
  }
}

const step8 = () => {
  //== 8 directions https://natureofcode.com/random/#the-random-walker-class==
  return { dx: floor(random(3)) - 1, dy: floor(random(3)) - 1 }
}

const stepContinuous = () => {
  //== Any direction (continuos range) https://natureofcode.com/random/#the-random-walker-class==
  return { dx: random(-10,10), dy: random(-10,10)}
}

const stepNonUniform = () => {
  //== Biased to moving to the right (non uniform distribution) https://natureofcode.com/random/#probability-and-nonuniform-distributions==
  const r = random(1);
  if (r < 0.4) {
  return { dx: 1, dy: 0 };
  } else if (r < 0.6) {
  return { dx: -1, dy: 0 };
  } else if (r < 0.8) {
  return { dx: 0, dy: 1 };
  } else {
  return { dx: 0, dy: -1 };
  }
}

const stepDynamic = (x,y) => {
  //== 50% to moving towards the cursor (dynamic probabilities) https://natureofcode.com/random/#probability-and-nonuniform-distributions==
  const r = random([0,1]);
  if (r === 0) {
    return {dx: x > mouseX ? -1 : 1, dy: y > mouseY ? -1 : 1};
  }
  else{
    return { dx: random(-1,1), dy: random(-1,1)}
  }
  }

  const stepGaussian = () =>{
    //== steps generated with a normal distribution https://natureofcode.com/random/#a-normal-distribution-of-random-numbers==
    return { dx:randomGaussian(0,1), dy:randomGaussian(0,1)}
  }

  const stepAcceptReject = () =>{
    //the longer the step, the less likely it is to be picked https://natureofcode.com/random/#a-custom-distribution-of-random-numbers//

    return { dx: acceptRejectQuadratic(-1,1), dy: acceptRejectQuadratic(-1,1)}

  }

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