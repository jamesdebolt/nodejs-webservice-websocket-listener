//imports
const PriorityQueue = require("./models/PriorityQueue");
const express = require("express");
const ws = require("ws");
const args = require("minimist")(process.argv.slice(2));

// constants
console.log("args" + args);
const port = args.port ? args.port : 3000;
const wsUrl = args.wsUrl ? args.wsUrl : "ws://localhost:7777";

// Make a server to:
//    A) Listen on a websocket, validate inputs, and store in a priority queue
//    and
//    B) Return the highest priority input upon http call for POP
const app = express();

const wsListener = new ws(wsUrl);

const queue = new PriorityQueue();

// return the highest priority element from the heap when requested
app.get("/pop", (req, res) => {
  res.send(queue.pop());
});

// respond to requests on the port
app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});

// listen to the websocket and push appropriate messages onto the queue
wsListener.on("message", function message(event) {
  queue.push(event);
});
