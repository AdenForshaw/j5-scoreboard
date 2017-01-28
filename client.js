// Connect to server
var io = require('socket.io-client');
var five = require("johnny-five");

//standard socket.io stuff, point it towards the server running socket.io to listen for events from.
var socket = io.connect('http://localhost:8080', {reconnect: true});

//This is an example using of having used NGrok to expose a web url to the server
//var socket = io.connect('http://81cb062b.ngrok.io', {reconnect: true});

var hitCounter = 0;


// Add a connect listener
socket.on('connect', function(socket) { 
  console.log("J5-Scoreboard","Connected to server!");
});
socket.on('hit event', function(msg){
    console.log("J5-Scoreboard",'recieved hit!');
    increment();
  });

var board = new five.Board();

function reset(){
  matrix.draw(0);
    hitCounter = 0;
    console.log("J5-Scoreboard",'Reset.');
}
function increment(){
    hitCounter++;
    matrix.draw(hitCounter);
    console.log("J5-Scoreboard",'Increment.');
}

//If you're using multiple arduinos on the same machine, you'll prbably need to specify the port as below, find which one you need via the arduino.cc IDE.
//var board = new five.Board({port:"/dev/cu.wchusbserial14210"});

var matrix
var redButton;
var greenButton;

board.on("ready", function() {

    console.log("J5-Scoreboard",'Board ready.');
    redButton = new five.Button(8);
    greenButton = new five.Button(9);


  // "down" the button is pressed
  redButton.on("down", function() {
   reset();
  });

  // "down" the button is pressed
  greenButton.on("down", function() {
    increment();
  });
  //Score display - an 8x8 matrix
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
