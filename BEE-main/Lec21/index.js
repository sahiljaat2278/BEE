const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.get("/health", (req, res) => {
    res.json({ status: "OK", 
        message: "Health check successful" });
});


mongoose.connect("mongodb://localhost:27017/blogapp", {
    
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error( err.message);
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});