var canvasSize = 750;
var sizeInput, button, animatedInput, timerLabel, falseLabel;
function setup() {
  var canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('canvas');

  sizeInput = createInput(8,'text');
  sizeInput.parent('input-text');
  sizeInput.addClass('form-control');
  sizeInput.id('sizeInput');
  sizeInput.attribute('placeholder', 'Board size');

  button = createButton('Submit');
  button.parent('input');
  button.mousePressed(resetSketch);
  button.addClass('btn btn-secondary mb-2');
  button.id('submit');

  animatedInput = createCheckbox('', true);
  animatedInput.parent('animated');

  timerLabel = createElement('label');
  timerLabel.parent('timer');
  timerLabel.addClass('text-white');
  // animatedInput.addClass('form-check-input');

  falseLabel = createElement('label');
  falseLabel.parent('false');
  falseLabel.addClass('text-danger');

  var input = document.getElementById('sizeInput');
  input.addEventListener("keyup", function (event) {
    event.preventDefault();
    console.log('fire');
    if (event.keyCode === 13) {
      resetSketch();
    }
  });
  resetSketch();

  //for (var i = 5; i <= 300; i+=1) {
  //  board = new SquareBoard(i);
  //  board.solve();
  //  console.log(`${i}: ${board.path.length} => ${board.path.length === i * i}`);
  //}
}

function resetSketch() {
  var error = document.getElementById('error');
  var value = parseInt(sizeInput.value());
  // console.log(value);
  if(isNaN(value)) { error.innerHTML = "Invalid input!"; return; }
  else if(value > 300) { error.innerHTML = "Too big!"; return; }
  else { error.innerHTML = ""; }
  clear();
  var boardSize = parseInt(value);
  board = new SquareBoard(boardSize);
  board.draw();
  var startTime = new Date().getMilliseconds();
  board.solve();
  var endTime = new Date().getMilliseconds();
  console.log(timerLabel);
  timerLabel.elt.innerHTML = `Elapsed time: ${(endTime-startTime)/1000} seconds`;
  if(board.path.length !== boardSize*boardSize) falseLabel.elt.innerHTML = "Cannot find path";
  else falseLabel.elt.innerHTML = "";
  board.drawPath();
}

function draw() {}