const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const cors = require("cors");
const app =express()
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(express.json());
app.use(cors());



//database connection
async function connect(){
    try{
        await mongoose.connect(process.env.uri)
        console.log("connected to mongo")
    }catch(error){
        console.log(error)
    }
}   
connect()


app.post('/api/register', async (req,res)=>{

    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            email: req.body.email,
            password: newPassword
        })
        res.json({status: 'ok'})

    }catch(error){
        res.json({status: 'error'})
    }
})

app.post('/api/login', async (req,res)=>{
    const user = await User.findOne({
        email:req.body.email,
    })
    const isPasswordValid = await bcrypt.compare(req.body.password,user.password);
    if(isPasswordValid){
        const token = jwt.sign({
            email:user.email
        },process.env.jwtkey)

        return res.json({status: "ok", user:token})
    }
    else{
        return res.json({status: "error", user:false})
    }
})

const port = 3000;
app.listen(port, console.log(`Listening on port ${port}...`));