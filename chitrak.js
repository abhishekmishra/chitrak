// Attach saveDrawing to save button
document
  .getElementById("save_drawing_button")
  .addEventListener("click", saveDrawing);

// Attach clearDrawing to clear button
document
  .getElementById("clear_drawing_button")
  .addEventListener("click", clearDrawing);

let prevMouseX, prevMouseY;
let drawingColor = "#000000";

document
  .getElementById("color_picker")
  .addEventListener("input", function (event) {
    drawingColor = event.target.value;
  });

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

function mouseDragged() {
  noStroke();
  fill(drawingColor);

  if (prevMouseX !== -1) {
    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;
    let distance = dist(prevMouseX, prevMouseY, mouseX, mouseY);
    let steps = distance / 5; // Adjust the step size as needed

    for (let i = 0; i < steps; i++) {
      let x = prevMouseX + (dx * i) / steps;
      let y = prevMouseY + (dy * i) / steps;
      brushStamp(x, y);
    }
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function brushStamp(x, y) {
  ellipse(x, y, 10, 10);
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
