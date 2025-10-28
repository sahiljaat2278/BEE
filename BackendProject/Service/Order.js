class OrderBook {
    constructor(symbol="BTCUSD") {
        this.bids=[],
        this.asks=[],
        this.nextId=1,
        this.lastTradePrice=null

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
}
//_ is just used so other devlopers know that this is a private function or variable
//if a function or variable starts with _(private)
///Let OrderBook = new OrderBook("BTCUSD")