//imports
const heap = require('./Heap');
const express = require('express');
const ws = require('ws');
const args = require('minimist')(process.argv.slice(2))

// constants
console.log(args);
const port = (args.port) ? args.port : 3000;
const wsUrl = (args.wsUrl) ? args.wsUrl : "ws://localhost:7777";

// higher priority number > smaller priority number
// tiebreaker is whichever came first
compareCalls = (a,b) => {
  if(a.priority === b.priority){
    return Date.parse(a.timestamp) - Date.parse(b.timestamp);
  } else {
    return b.priority - a.priority;
  }
}

// valid inputs are json objects that at least have priority/timestamp
validInput = (input) => {
  let parsedEvent = JSON.parse(input);

  if(typeof parsedEvent === "object" && parsedEvent != null && parsedEvent.priority && parsedEvent.timestamp){
    return true;
  }
}

// Make a server to:
//    A) Listen on a websocket, validate inputs, and store in a priority queue
//    and
//    B) Return the highest priority input upon http call for POP
const app = express();

const wsListener = new ws(wsUrl);

const queue = new heap(compareCalls);

// return the highest priority element from the heap when requested
app.get('/pop', (req, res) => {
  res.send(queue.pop());
})

// respond to requests on the port
app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
})

// listen to the websocket and push appropriate messages onto the queue
wsListener.on('message', function message(event) {
  try{
    if(validInput(event)){
      queue.push(JSON.parse(event));
    }
  } catch (e){
    console.log("bad data receieved, disregarded " + e);
  }
});