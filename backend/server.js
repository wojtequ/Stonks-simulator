const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRegExp = /.{5,}/;
const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

app.use(express.json());
app.use(cors());

//database connection
async function connect() {
  try {
    await mongoose.connect(process.env.uri);
    console.log("connected to mongo");
  } catch (error) {
    console.log(error);
  }
}
connect();

app.post("/api/register", async (req, res) => {
  try {
    const isUserNameValid = await loginRegExp.test(req.body.userName);
    const isPasswordValid = await passwordRegExp.test(req.body.password);
    const newPassword = await bcrypt.hash(req.body.password, 10);
    if (isPasswordValid && isUserNameValid) {
      const user = await User.create({
        userName: req.body.userName,
        password: newPassword,
      });
      const token = jwt.sign(
        {
          userName: user.userName,
        },
        process.env.jwtkey
      );
      return res.json({status: "ok", token: token,userName:user.userName});
    }
    if (!isUserNameValid) {
      res.status(400).json({ message: "wrong username" });
    }
    if (!isPasswordValid) {
      res.status(400).json({ message: "wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "user already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
    });
    if (!user) {
      return res.status(400).json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!isPasswordValid) {
        return res.status(400).json({message: "Wrong password"});
    }
    if (isPasswordValid) {
      const token = jwt.sign(
          {
            userName: user.userName,

          },
          process.env.jwtkey
      );

      return res.json({status: "ok", token: token,userName:user.userName});
    }
  }catch(error) {
      console.log(error)
      return res.status(400).json({ message: "wrong password" });
    }
  });

app.put("/api/balance", auth, async(req,res) => {
try{
  const filter = { userName:req.user.userName };
  const update = {$inc: {"balance":req.body.balance}}; 
  const user = await User.findOne(filter)
  if (!user) {
    return res.status(400).json({message: "User not found"});
  }
 
  const updatedUser = await User.findOneAndUpdate(filter,update)

 return res.json({status: "ok",});
}catch(error){
  console.log(error)
  return res.status(400).json({ message: "Invalid balance" });
}

});

app.get("/api/balance", auth, async(req,res) => {
  try{
    const filter = { userName:req.user.userName };
    const user = await User.findOne(filter)
    if (!user) {
      return res.status(400).json({message: "User not found"});
    }  
   return res.json({status: "ok", balance:user.balance});
  }catch(error){
    console.log(error)
    return res.status(400).json({ message: "Invalid balance" });
  }
  
  });

  function auth(req,res,next){
    const authHeder=req.headers["authorization"]
    const token = authHeder.split(' ')[1]
    if(token==null) return res.status(400).json({message:"No token provided"})
    jwt.verify(token,process.env.jwtkey, (err,user)=>{
      if(err) return res.status(403).json({message: "Invalid token"}) 
      req.user=user
    })
    next()
  }

// const newUser = new User({
//   userName: "Andriejjjjjjjjj",
//     password: "dupaaaaaaa",
//     balance: 400,
//   ownedStocks: [
//       { stockName: 'xyz', stockCount: 10 }, { stockName: 'ABC', stockCount: 20 },
//       { stockName: 'pqr', stockCount: 10 }]
// });
// newUser.save();


const port = 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
