const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


const settings = {
  dimensions: [ 2048, 2048 ],
  //suffix: 'asdf',
  suffix: random.getSeed(),
  pixelsPerInch: 300
};

random.setSeed(random.getRandomSeed());
console.log(random.getSeed());

const sketch = () => {

  //single random palette (array) of 5 different colors
  //const palette = random.pick(palettes);
  const colorCount = random.rangeFloor(1, 6);
  //const palette = random.pick(palettes).slice(0, colorCount);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);


  const createGrid = () => {
    const points = [];
    const count = 30;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        //UVSpace: working in nums between 0 and 1
        const u = count <= 1 ? 0.5 : x / (count - 1); //value between 0 and 1
        const v = count <= 1 ? 0.5 : y / (count - 1);
        //const radius = Math.abs(random.noise2D(u, v));
        const radius = Math.abs(random.noise2D(u, v)) * 0.05;

        points.push({
          color: random.pick(palette),
          //radius: random.value() * 0.005,
          //radius: Math.abs(0.01 + random.gaussian() * 0.01 ),
          rotation: random.noise2D(u, v) * 1.5,
          //rotation: random.noise2D(Math.max(0, random.gaussian() * 0.01) * u, Math.max(0, random.gaussian() * 0.01) * v) * 1.5,
          radius,
          //radius: Math.max(0, random.gaussian() * 0.01),
          position: [u, v]
        });
      }
    }
    return points;
  };

  //const points = createGrid();
  //const points = createGrid().filter(() => Math.random() > 0.5);

  //unique identifer
  //random.setSeed("512");
  //random.setSeed('asdf');
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 300;

  //console.log(points);

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {

      const {
        position,
        radius,
        color,
        rotation
      } = data;

      const [u, v] = position;

      //const x = u * width;
      const x = lerp(margin, width - margin, u);
      //const y = v * height;
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.strokeStyle = "white";
      // context.lineWidth = 20;
      // context.fillStyle = color;
      // context.fill();
      // context.stroke();
      context.save();
      context.fillStyle = color;
      context.font = `${radius * width * 3}px Helvetica`;
      context.translate(x, y);
      //context.rotate(0.65);
      context.rotate(rotation);
      context.fillText('◼︎', 0, 0);
      //context.rotate(-1);
      context.restore();
    });

  }
};

canvasSketch(sketch, settings);
