const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    balance: {type:mongoose.SchemaTypes.Decimal128,default:500}


})

const User = mongoose.model("User", UserSchema);

module.exports=User