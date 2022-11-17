const mongoose = require('mongoose')
const ownedStocksSchema = require("./ownedStocks")

const UserSchema = new mongoose.Schema({
    userName: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    balance: {type:Number,default:500},
    ownedStocks:[ownedStocksSchema.schema],
    
})

const User = mongoose.model("User", UserSchema);

module.exports=User