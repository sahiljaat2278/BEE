class OrderBook {
    constructor(symbol="BTCUSD") {
        this.symbol = symbol;
        this.bids = [];
        this.asks = [];
        this.nextId = 1;
        this.lastTradePrice = null;
    }
    //helper
    _genOrderID(){
        return this.nextId++;
    }
    _sort(sides){
        if(sides==="BUY"){
            this.bids.sort((a,b)=>{
                if(a.price !=b.price){
                    return b.price - a.price
                }
                return a.timestamp - b.timestamp
            })
        }else{
            this.asks.sort((a,b)=>{
                if(a.price !=b.price){
                    return a.price - b.price
                }
                return a.timestamp - b.timestamp
            })
        }
    }
    ////Public function
    /*
    1. create new order {orderID,side,type,price?,orignqty,remainingquantity,execqty,timestamp,user}
    2. match type if ==market ,call market, else call limit match
     */
_PlaceOrder(symbol,side,type,price=null,quantity,user){
    // Basic Validation 
    /**
     bids:[]sorted descending,
     asks:[]sorted ascending

     1. type : buy | sell
     2. if buy start buying from ask array starting from index 0.
      loop while order.remainQTY>0 && ask.length>0
      buy min(order.remainingQty,ask[0].remainingQty)
      update remaining qty and executedqty from both side

    */
        
    
    let order={
        symbol: this.symbol,
        side: side,
        type: type,
        price: price,
        originalQty: quantity,
        remainQty: quantity,
        executedQty: 0,
        timestamp: Date.now(),
        user: user
    };
   
    if(type === "MARKET"){
        this._marketMatch(order);
    }else{
        this._limitMatch(order);
    }
}

_marketMatch(order){
    // use order.side (not undefined variable)
    if(order.side === "BUY"){
        let askArr = this.asks;
        
        while(order.remainQty > 0 && askArr.length > 0){
            let top = askArr[0];
            // support orders that may use `quantity` as initial size
            let topRemain = (top.remainQty != null) ? top.remainQty : (top.quantity != null ? top.quantity : 0);
            let orderfill = Math.min(order.remainQty, topRemain);

            order.executedQty = order.executedQty + orderfill;
            top.executedQty = (top.executedQty || 0) + orderfill;
            top.remainQty = topRemain - orderfill;

            if(top.remainQty === 0){
                askArr.shift();
            } else {
                // partially filled top, continue or break based on business logic
                if(order.remainQty <= 0) break;
            }

            order.remainQty = order.remainQty - orderfill;
        }
    } else if(order.side === "SELL"){
        let bidArr = this.bids;

        while(order.remainQty > 0 && bidArr.length > 0){
            let top = bidArr[0];
            let topRemain = (top.remainQty != null) ? top.remainQty : (top.quantity != null ? top.quantity : 0);
            let orderfill = Math.min(order.remainQty, topRemain);

            order.executedQty = order.executedQty + orderfill;
            top.executedQty = (top.executedQty || 0) + orderfill;
            top.remainQty = topRemain - orderfill;

            if(top.remainQty === 0){
                bidArr.shift();
            }

            order.remainQty = order.remainQty - orderfill;
        }
    }
}

_limitMatch(order){
    // simple limit match: insert into book and sort
    if(order.side === "BUY"){
        this.bids.push(Object.assign({}, order));
        this._sort("BUY");
    } else {
        this.asks.push(Object.assign({}, order));
        this._sort("SELL");
    }
}

getBookSnapshot(){
    return {
        lastUpdated: Date.now(),
        bids: this.bids.map((o)=>[o.price]),
        asks: this.asks.map((o)=>[o.price])
    }
}
}

//_ is just used so other devlopers know that this is a private function or variable
//if a function or variable starts with _(private)
///Let OrderBook = new OrderBook("BTCUSD")


let BTCUSDOrderBook = new OrderBook()

BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:100,quantity:10,timestamp:Date.now(),user:"Sahil"})

BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:101,quantity:10,timestamp:Date.now(),user:"Aman"})

BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:105,quantity:10,timestamp:Date.now(),user:"Ankit"})  

BTCUSDOrderBook._sort("BUY")
console.log(BTCUSDOrderBook.bids);