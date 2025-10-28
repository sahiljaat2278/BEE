class OrderBook {
    constructor(symbol="BTCUSD") {
        this.bids=[],
        this.asks=[],
        this.nextId=1,
        this.lastTradePrice=null

    }
    //helper
    _genOrderID(){
        return this._nextId++;
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