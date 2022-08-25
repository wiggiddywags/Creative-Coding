const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');



const settings = {
  dimensions: [ 2048, 2048 ],
  pixelsPerInch: 300
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 50;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        //UVSpace: working in nums between 0 and 1
        const u = count <= 1 ? 0.5 : x / (count - 1); //value between 0 and 1
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  //const points = createGrid();
  //const points = createGrid().filter(() => Math.random() > 0.5);

  //unique identifer
  random.setSeed("512");
  //random.setSeed('asdf');
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 300;

  //console.log(points);

  return ({ context, width, height }) => {
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      //const x = u * width;
      const x = lerp(margin, width - margin, u);
      //const y = v * height;
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 2, 0, Math.PI * 2, false);
      context.strokeStyle = "white";
      context.lineWidth = 10;
      context.stroke();
    });

  }
};

canvasSketch(sketch, settings);
