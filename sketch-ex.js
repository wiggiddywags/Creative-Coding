const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ],
  //dimensions: [16, 10], //cm when units: 'cm'
  //orientation: 'portrait',
  //orientation: 'landscape'
  //dimensions: 'A4',
  //dimensions: 'A3',
  //dimensions: 'letter'
  //units: 'cm',
  //units: 'in',
  //uints: 'ft',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.2, 0, Math.PI * 2
    , false);
    context.fillStyle = 'blue';
    context.fill();
    
    context.lineWidth = width * 0.02;
    context.strokeStyle = 'darkblue';
    context.stroke();
  };
};

canvasSketch(sketch, settings);
