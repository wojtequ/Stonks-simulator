const mongoose = require('mongoose')

const OwnedStocksSchema = new mongoose.Schema({
    stockName: {type: String},
    stockCount: {type:Number}
})


const OwnedStocks = mongoose.model("OwnedStocks", OwnedStocksSchema);

module.exports=OwnedStocks