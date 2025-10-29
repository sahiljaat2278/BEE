class OrderBook{
    constructor(symbol="BTCUSD"){
        this.bids= [],
        this.ask= [],
        this._nextId= 1,
        this.lastTradedPrice=null

    }
    //helper
    _genOrderId(){
        return this._nextId++;
    }
    _sort(sides){
        if(sides==="BUY"){
            this.bids.sort((a,b)=>{
                if(a.price!=b.price){
                    return b.price - a.price;
                }
                return a.timestamp - b.timestamp;
            })
        }else{
            this.ask.sort((a,b)=>{
                if(a.price!=b.price){
                    return a.price - b.price;
                }
                return a.timestamp - b.timestamp;
            })

        }
    }
    //   explain the logic why bids and ask are sorted in such way ?
    // Ans - Bids are sorted in descending order because buyers want to pay the lowest price possible, so higher bids take precedence.
    // Asks are sorted in ascending order because sellers want to sell at the highest price possible, so lower asks take precedence.
    

    //function to place new order in orderbook
    /* 
    1. create new order {orderId,side,type,price?,orignqty,remainingqty,execqty,timestamp,user}
    2. match type if type == market , call marketMatch else call limitMatch
    
    */

    placeholder(side,type,price=null,quantity,user){
        /* Baasic Validation */
        let order = {
            orderId : this._genOrderId(),
            symbol : this.symbol,
            side : side,
            type : type,
            price : price,
            orignqty : quantity,
            remainqty : quantity,
            execqty : 0,
            timestamp : Date.now(),
            user : user
        }
        if(type==="MARKET"){
            let result = this._marketMatch(order);
            if(order.remainqty>0){
                console.log(" order completed "+ result.execqty+ " order.remainqty"+result.remainqty);
            }
        }else{
            let result = this._limitMatch(order);
        }
    }
    //execute order if it is market order
    /* 
    bids: [] sorted descending
    ask: [] sorted ascending
    1. type: buy/sell
    2. if buy start buying from asks array starting from index 0.
    loop while order remainingqty >0 and asks.length>0
    buy min(order.remainingqty,asks[0].remainingqty)
    update remainingqty and execqty of both orders
  

    */
    _marketMatch(order){
       if(order.side==="BUY"){
         let askArr = this.ask;
         
          while(order.remainqty>0 && askArr.length>0){
            let top = askArr[0];
            let orderfill = Math.min(order.remainqty,top.remainqty);
            order.execqty += orderfill;
            order.remainqty -= orderfill;

            top.execqty += orderfill;
            top.remainqty -= orderfill;

            if(top.remainqty<=0){
                askArr.shift();
            }
          }
        }
        return {order}
    }

    //execute order if it is limit order
    _limitMatch(){
        if(order.side==="BUY"){
            let opposite = this.ask;
            while(order.remainqty>0 && opposite.length>0){
                let top = opposite[0];
                if(order.price>=top.price){
                    let filledOrders = Math.min(order.remainqty,top.remainqty);
                    order.execqty += filledOrders;
                    order.remainqty -= filledOrders;

                    top.execqty += filledOrders;
                    top.remainqty -= filledOrders;
                    if(top.remainqty<=0){
                        opposite.shift();
                    }
                }
            }
            if(order.remainqty>0){
                this.bids.push(order);
                this._sort("BUY"); 
            }
        }else{
            let opposite = this.bids;
            while(order.remainqty>0 && opposite.length>0){
                let top = opposite[0];
                if(order.price<=top.price){
                    let filledOrders = Math.min(order.remainqty,top.remainqty);
                    order.execqty += filledOrders;
                    order.remainqty -= filledOrders;
                    
                    top.execqty += filledOrders;
                    top.remainqty -= filledOrders;
                    if(top.remainqty<=0){
                        opposite.shift();
                    }
                }
            }
            if(order.remainqty>0){
                this.ask.push(order);
                this._sort("SELL"); 
            }
        }
        
    }
    getBookSnapshot(){
        return {
            lastUpdated : Date.now(),
            bids: this.bids.map((o)=>([o.price,o.remainqty])),
            ask: this.ask.map((o)=>([o.price,o.remainqty])),
            // currentPrice:
        }
    }
}
//if a function or variable start with (private)
//let orderbook = new OrderBook("BTCUSD")
let BTCUSDOrderBook = new OrderBook("BTCUSD");



BTCUSDOrderBook.placeholder("BUY","LIMIT","1506.00",10,"Gaurish");
BTCUSDOrderBook.placeholder("BUY","LIMIT","1505.00",20,"Sahil");
BTCUSDOrderBook.placeholder("BUY","LIMIT","1500.00",10,"Vansh");

BTCUSDOrderBook.placeholder("SELL","LIMIT","1510.00",5,"Anuj");
BTCUSDOrderBook.placeholder("SELL","LIMIT","1515.00",15,"Rohit");
BTCUSDOrderBook.placeholder("SELL","LIMIT","1520.00",10,"Karan");

console.log(BTCUSDOrderBook.getBookSnapshot());




// BTCUSDOrderBook._sort("BUY");
// console.log(BTCUSDOrderBook.bids);