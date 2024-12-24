function setup() {
    // use the canvas by id "drawing_canvas"
    createCanvas(400, 400, P2D, document.getElementById("drawing_canvas"));        
    clearDrawing();
}

function draw() {
}

function mouseDragged() {
    noStroke();
    fill(100);
    ellipse(mouseX, mouseY, 10, 10);
}

function keyPressed() {
    if (key === 'c') {
        clear();
    }
}

function clearDrawing() {
    clear();
    background(220);
}