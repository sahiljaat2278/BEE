const {createClient} = require('redis');

let publisher = createClient();
let subscriber = createClient();
publisher.connect()
    .then(() => {
        console.log("Publisher connected to Redis");
    });

subscriber.connect()
    .then(() => {
        console.log("Subscriber connected to Redis");
    });

module.exports = {
    publisher, 
    subscriber,
};