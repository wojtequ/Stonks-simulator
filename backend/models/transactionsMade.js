const mongoose = require('mongoose')

const TransactionsMadeSchema = new mongoose.Schema({
    transactionDate: {type: Date},
    stockName: {type: String},
    stockCount: {type: Number},
    buyOrSell: {type: Boolean},
    transactionCost: {type: Number},
    stockPrice: {type: Number}
})

const TransactionsMade = mongoose.model("TransactionsMade", TransactionsMadeSchema)

module.exports = TransactionsMade