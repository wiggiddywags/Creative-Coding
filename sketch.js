const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');



const settings = {
  dimensions: [ 2048, 2048 ],
  pixelsPerInch: 300
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 5;
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

  const points = createGrid();
  const margin = 400;

  //console.log(points);

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      //const x = u * width;
      const x = lerp(margin, width - margin, u);
      //const y = v * height;
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 100, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 20;
      context.stroke();
    });

  }
};

canvasSketch(sketch, settings);
