const express = require('express');
const app = express();
constorderRoutes = require('../routes/order');


app.use(express.json());
app.use("/api/v1/orders",orderRoutes);


app.listen(3000,()=>{
    console.log("Server started");
});
