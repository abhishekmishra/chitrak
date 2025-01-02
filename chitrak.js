let prevMouseX, prevMouseY;
let drawingColor = "#000000";
let stampTypes = {
  circle: stampCircle,
  square: stampSquare,
  pencil: stampPencil,
};
let currentStampType = "pencil";
let brushSize = 10;

// Attach saveDrawing to save button
document
  .getElementById("save_drawing_button")
  .addEventListener("click", saveDrawing);

// Attach clearDrawing to clear button
document
  .getElementById("clear_drawing_button")
  .addEventListener("click", clearDrawing);

document
  .getElementById("color_picker")
  .addEventListener("input", function (event) {
    drawingColor = event.target.value;
  });

document
  .getElementById("brush_size_slider")
  .addEventListener("input", function (event) {
    brushSize = event.target.value;
  });

// load the current color from the color picker
drawingColor = document.getElementById("color_picker").value;

function setup() {
  // use the canvas by id "drawing_canvas"
  createCanvas(600, 600, P2D, document.getElementById("drawing_canvas"));
  clearDrawing();
  resetMousePosition();
}

function draw() {}

function resetMousePosition() {
  prevMouseX = -1;
  prevMouseY = -1;
}

function mouseDragged(event) {
  brushMoved(mouseX, mouseY, 1.0);
}

function brushMoved(brushX, brushY, pressure) {
  noStroke();
  fill(drawingColor);

  if (prevMouseX !== -1) {
    let dx = brushX - prevMouseX;
    let dy = brushY - prevMouseY;
    let distance = dist(prevMouseX, prevMouseY, brushX, brushY);
    let steps = distance / 5; // Adjust the step size as needed

    for (let i = 0; i < steps; i++) {
      let x = prevMouseX + (dx * i) / steps;
      let y = prevMouseY + (dy * i) / steps;
      brushStamp(x, y, pressure);
    }
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function brushStamp(x, y, pressure) {
  stampTypes[currentStampType](x, y, pressure);
}

function stampCircle(x, y, pressure) {
  let adjustedBrushSize = brushSize * pressure;

  ellipse(x, y, adjustedBrushSize, adjustedBrushSize);
}

function stampSquare(x, y, pressure) {
  let adjustedBrushSize = brushSize * pressure;

  rect(x, y, 10, 10);
}

function stampPencil(x, y, pressure) {
  let adjustedBrushSize = brushSize * pressure;

  // adjust location for brush size
  x -= adjustedBrushSize / 2;
  y -= adjustedBrushSize / 2;

  // stamp 10 circles in and around the mouse position
  // using perlin noise to position and size them
  for (let i = 0; i < 25; i++) {
    let nX = noise(x + i) * adjustedBrushSize;
    let nY = noise(y + i) * adjustedBrushSize;
    let sz = noise(x + y + i) * 2; // incorporate pressure
    ellipse(x + nX, y + nY, sz, sz);
  }
}
// reset mouse position when mouse is released
function mouseReleased() {
  resetMousePosition();
}

function keyPressed() {
  if (key === "c") {
    clear();
  }
}

function clearDrawing() {
  clear();
  background(220);
}

function saveDrawing() {
  saveCanvas("drawing", "png");
}

function touchStarted(event) {
  if (event.type == "touchstart") {
    const pressure = event.touches[0].force;
    brushMoved(mouseX, mouseY, pressure);
  }
}

function touchMoved(event) {
  if (event.type == "touchmove") {
    const pressure = event.touches[0].force;
    brushMoved(mouseX, mouseY, pressure);
  }
}

function touchEnded(event) {
  if (event.type == "touchend") {
    resetMousePosition();
  }
}
