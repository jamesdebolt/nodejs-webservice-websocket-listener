const PriorityQueue = require("../models/PriorityQueue");

// basic one add and pop
test("add one valid call and pop it", () => {
  const pq = new PriorityQueue();
  pq.push(
    '{"first_name":"Claud","last_name":"Stoltenberg","timestamp":"2021-11-15T20:36:00.837740957Z","sip":"https://127.0.0.1:33213/0d22fc3f-e1b6-45b9-bb4b-0f28010fcf13","city":"McDermottstad","state":"VA","phone_number":"6163949282","priority":56}'
  );
  const res = pq.pop();

  expect(res.first_name).toBe("Claud");
});

// add none and pop
test("pop with nothing added", () => {
  const pq = new PriorityQueue();
  const res = pq.pop();

  expect(res).toStrictEqual({});
});

// add invalids and pop
test("pop with invalid entries added", () => {
  const pq = new PriorityQueue();

  // not an object
  pq.push("This line is useless disregard me");

  // add one with no priority
  pq.push(
    '{"first_name":"NO","last_name":"PRIORITY","timestamp":"2021-11-15T20:36:00.837740957Z","sip":"https://127.0.0.1:33213/0d22fc3f-e1b6-45b9-bb4b-0f28010fcf13","city":"McDermottstad","state":"VA","phone_number":"6163949282"'
  );

  const res = pq.pop();

  expect(res).toStrictEqual({});
});

// add 6 including 1 invalid entry, pop six times return the five in the correct order and then empty
test("add five, add bad, pop six", () => {
  const pq = new PriorityQueue();
  pq.push(
    '{"first_name":"James","last_name":"Stoltenberg","timestamp":"2021-11-15T20:36:00.837740957Z","sip":"https://127.0.0.1:33213/0d22fc3f-e1b6-45b9-bb4b-0f28010fcf13","city":"McDermottstad","state":"VA","phone_number":"6163949282","priority":60}'
  );
  pq.push(
    '{"first_name":"Kjell","last_name":"Stoltenberg","timestamp":"2021-11-15T20:36:00.837740957Z","sip":"https://127.0.0.1:33213/0d22fc3f-e1b6-45b9-bb4b-0f28010fcf13","city":"McDermottstad","state":"VA","phone_number":"6163949282","priority":80}'
  );
  pq.push(
    '{"first_name":"Victor","last_name":"Stoltenberg","timestamp":"2021-11-15T20:36:00.837740957Z","sip":"https://127.0.0.1:33213/0d22fc3f-e1b6-45b9-bb4b-0f28010fcf13","city":"McDermottstad","state":"VA","phone_number":"6163949282","priority":40}'
  );
  pq.push("invalid entry");
  pq.push(
    '{"first_name":"Victor","last_name":"Stoltenberg","timestamp":"2021-11-15T20:36:00.837740957Z","sip":"https://127.0.0.1:33213/0d22fc3f-e1b6-45b9-bb4b-0f28010fcf13","city":"McDermottstad","state":"VA","phone_number":"6163949282","priority":0}'
  );
  pq.push(
    '{"first_name":"Louis","last_name":"Stoltenberg","timestamp":"2021-11-15T20:36:00.837740957Z","sip":"https://127.0.0.1:33213/0d22fc3f-e1b6-45b9-bb4b-0f28010fcf13","city":"McDermottstad","state":"VA","phone_number":"6163949282","priority":20}'
  );

  let res = pq.pop();
  expect(res.priority).toBe(80);
  res = pq.pop();
  expect(res.priority).toBe(60);
  res = pq.pop();
  expect(res.priority).toBe(40);
  res = pq.pop();
  expect(res.priority).toBe(20);
  res = pq.pop();
  expect(res.priority).toBe(0);
  res = pq.pop();
  expect(res).toStrictEqual({});
});
