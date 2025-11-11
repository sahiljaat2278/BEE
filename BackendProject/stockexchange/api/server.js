const express=require("express");
const app=express();
const orderRoute=require("./routes/order");

app.use(express.json());
app.use("/api/v1/order",orderRoute);
app.get("/",(req,res)=>{
    console.log("Route");
})

app.listen(3000,()=>{
    console.log("Server started");
});