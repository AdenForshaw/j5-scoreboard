console.log('1');
// Connect to server
var io = require('socket.io-client');

var five = require("johnny-five");
var socket = io.connect('http://localhost:8080', {reconnect: true});
//var socket = io.connect('http://81cb062b.ngrok.io', {reconnect: true});

var hitCounter = 0;

console.log('2');

// Add a connect listener
socket.on('connect', function(socket) { 
  console.log('Connected!');
});
socket.on('hit event', function(msg){
    console.log('recieved hit!');
    hitCounter++;
    matrix.draw(hitCounter);
    
  });
console.log('3');
//var board = new five.Board({port:"/dev/cu.usbmodem1441"});
var board = new five.Board({port:"/dev/cu.wchusbserial14210"});
var matrix
var redButton;
var greenButton;

board.on("ready", function() {

    redButton = new five.Button(8);
    greenButton = new five.Button(9);


  // "down" the button is pressed
  redButton.on("down", function() {
    matrix.draw(0);
    hitCounter = 0;
  });

  // "down" the button is pressed
  greenButton.on("down", function() {
    hitCounter++;
    matrix.draw(hitCounter);
  });

   matrix= new five.Led.Matrix({
    pins: {
      data: 2,
      clock: 3,
      cs: 4
    }
  });

  matrix.on();
    matrix.draw(0);

});
