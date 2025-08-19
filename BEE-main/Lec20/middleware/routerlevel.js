function m5(req, res, next) {
    console.log("Middleware 1");
    req.userId = "4"
    next(); 
}

module.exports = { m5 };