const router = require('express').Router();
const { placeOrder } = require('../controller/order_v2');

router.post("/", placeOrder);

module.exports = router;