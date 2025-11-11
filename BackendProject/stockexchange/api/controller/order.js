const OrderBook = require("../service/orderService");
let {publisher}=require("../../shared/server");
let ob=new OrderBook("BTCUSD");  //global object

module.exports.postPlaceOrder=async(req,res)=>{
    // to create a new order for user who is placing the order
    let {side,type,price,quantity,user}=req.body;
    //global object islie bnaya h taaki ik hee object bna rhe hr baar nya obj na bne
    let response=ob.placeOrder(side,type,price,quantity,user);
    await publisher.connect();
    publisher.publish("Book_update",JSON.stringify(response.book));
    res.json({
        event:"Orderupdate",
        data:{
            orderReport:response.result,
            book:response.book
        }
    })
    console.log(response);
}