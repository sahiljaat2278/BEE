const OrderBook = require('../Service/Order');
let ob=new OrderBook("BTCUSD") //global order book 

module.exports.placeOrder = async (req, res) => {
///to create a new order for a user who is placing an order
let { side, type, price, quantity, user } = req.body;
//if i create object here 
let response = OrderBook.placeOrder( side, type, price, quantity, user );

console.log(response);

}


//more controller function
