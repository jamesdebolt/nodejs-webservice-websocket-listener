# Priority Queue Simulation (Websockets / HTTP)

This server simulates a system which manages a priority queue.

This server connects to a specified websocket, and listens for emitted objects. Emitted objects are considered valid if they're parsed into a JS object with top-level fields "priority" and "timestamp" populated. Invalid objects are ignored.

The server also exposes a /pop GET HTTP endpoint that will return the highest priority object in its queue, and remove that element from the queue. An empty JSON will be returned if no element is present in the queue.

## Running the server

This server can be run from the command-line using npm after cloning the project.

```shell
npm install
node app.js
```

The default port of 3000, and default ws connection url of `ws://localhost:7777` can be changed with command line arguments:
```shell
node app.js --port 1000 --wsUrl ws:localhost://1234
```

## Testing the server

After starting the server as outlined above, navigate to `http://localhost:<PORT>/pop` and see the full JSON of returned highest priority element. Refreshing the page will request the next element.

Alternatively, navigate to the root of the project and execute the following command to run the test suite:
```shell
npm run test
```

## Limitations

Coded to requirements of needing to connect to one websocket, and only pop from the queue. Future steps to include allowing multiple sockets, more endpoints exposing more operations on the underlying heap, and moving per-route logic into invidual files
