const OrderBook = require('../Service/Order');
let { publisher } = require('../shared/index');




let ob = new OrderBook("BTCUSD"); // global order book

module.exports.placeOrder = async (req, res) => {
///to create a new order for a user who is placing an order
let { side, type, price, quantity, user } = req.body;
//if i create object here 
let response = ob.placeOrder(side, type, price, quantity, user);
publisher.publish('book_update', JSON.stringify(response.book));
req.JSON({
    event: 'or',
})

}


//more controller function