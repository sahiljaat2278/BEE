const OrderBook = require('../Service/Order');
// Create a single, global order book instance for the symbol
let ob = new OrderBook("BTCUSD");

module.exports.placeOrder = async (req, res) => {
    // to create a new order for a user who is placing an order
    let { side, type, price, quantity, user } = req.body;
    try {
        const result = ob.placeOrder(side, type, price, quantity, user);
        return res.status(200).json({ success: true, data: result || ob.getBookSnapshot() });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

// more controller functions can go here