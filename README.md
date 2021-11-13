# Priority Queue Simulation (Websockets / HTTP)

This server simulates a system which manages a priority queue.

This server connects to a specified websocket, and listens for emitted objects. Emitted objects are considered valid if they're parsed into a JS object with top-level fields "priority" and "timestamp" populated. Invalid objects are ignored.

Periodically, this server sends a message to any connected client. The majority of messages are _JSON events_ representing a pending customer call in the following format:

The server also exposes a /pop GET HTTP endpoint that will return the highest priority object in its queue, and remove that element from the queue. An empty JSON will be returned if no element is present in the queue.

## Running the server

This server can be run from the command-line using npm after cloning the project.

```shell
npm install
node server.js
```

The default port of 3000, and default ws connection url of ws://localhost:7777 can be changed with command line arguments:
```shell
node server.js --port 1000 --wsUrl ws:localhost://1234
```

## Testing the server

After starting the server as outlined above, navigate to http://localhost:<PORT>/pop and see the full JSON of returned highest priority element. Refreshing the page will request the next element.