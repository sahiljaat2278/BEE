const { createClient } = require("redis");

let publisher = createClient();
let subscriber = createClient();

// publisher.connect().then(() => console.log("Publisher connected to client"));
// subscriber.connect().then(() => console.log("Subscriber connected to client"));

module.exports = { publisher, subscriber };