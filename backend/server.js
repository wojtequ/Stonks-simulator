const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/user");
const OwnedStocks = require("./models/ownedStocks");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { Z_NEED_DICT } = require("zlib");
const loginRegExp = /.{5,}/;
const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

app.use(express.json());
app.use(cors());
//database connection
async function connect() {
  try {
    mongoose.connect(process.env.uri);
    console.log("connected to mongo");
  } catch (error) {
    console.log(error);
  }
}
connect();

app.post("/api/register", async (req, res) => {
  try {
    const isUserNameValid = loginRegExp.test(req.body.userName);
    const isPasswordValid = passwordRegExp.test(req.body.password);
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
      return res.json({ status: "ok", token: token, userName: user.userName });
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
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong password" });
    }
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          userName: user.userName,
        },
        process.env.jwtkey
      );

      return res.json({ status: "ok", token: token, userName: user.userName });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "wrong password" });
  }
});

app.put("/api/balance", auth, async (req, res) => {
  try {
    const filter = { userName: req.user.userName };
    const update = { $inc: { balance: req.body.balance } };
    const user = await User.findOne(filter);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const updatedUser = await User.findOneAndUpdate(filter, update);

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid balance" });
  }
});

app.get("/api/balance", auth, async (req, res) => {
  try {
    const filter = { userName: req.user.userName };
    const user = await User.findOne(filter);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json({ status: "ok", balance: user.balance });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid balance" });
  }
});

const companies = [
  "GOOG",
  "TSLA",
  "TBLA",
  "AMZN",
  "AAPL",
  "AMD",
  "SOFI",
  "PDD",
  "NVDA",
  "IQ",
];

app.get("/api/stocks/realtime", async (req, res) => {
  try {
    const stocksArray = [];
    await axios({
      method: "get",
      url: `https://api.nasdaq.com/api/quote/watchlist?symbol=goog%7cstocks&symbol=tsla%7cstocks&symbol=tbla%7cstocks&symbol=amzn%7cstocks&symbol=aapl%7cstocks&symbol=amd%7cstocks&symbol=sofi%7cstocks&symbol=pdd%7cstocks&symbol=nvda%7cstocks&symbol=iq%7cstocks`,
    }).then((response) => {
      for (let i = 0; i < Object.keys(response.data.data).length; i++) {
        const object = {
          symbol: response.data.data[i].symbol,
          companyName: response.data.data[i].companyName,
          lastSalePrice: response.data.data[i].lastSalePrice
            ? Number(response.data.data[i].lastSalePrice.slice(1)).toFixed(2)
            : "",
          percentageChange: response.data.data[i].percentageChange,
          deltaIndicator: response.data.data[i].deltaIndicator,
        };
        stocksArray.push(object);
      }
    });
    return res.json({ status: "ok", stocks: stocksArray });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid call" });
  }
});

app.get("/api/stocks/day", async (req, res) => {
  try {
    let chartData = [];
    let promises = [];
    let object = {};
    for (let i = 0; i < companies.length; i++) {
      let datesArray = [];
      promises.push(
        await axios
          .get(
            `https://api.nasdaq.com/api/quote/${companies[i]}/chart?assetclass=stocks`
          )
          .then((response) => {
            response.data.data?.chart.forEach((element) => {
              datesArray.push({
                ...element.z,
                value: Number(Number(element?.z?.value).toFixed(2)),
              });
            });
            object = { name: response.data.data?.symbol, chart: datesArray };
            chartData.push(object);
          })
      );
    }
    Promise.all(promises).then(() => res.json({ status: "ok", chartData }));
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid Call" });
  }
});

app.get("/api/stocks/date/", async (req, res) => {
  try {
    const todaysDate = new Date().toJSON().slice(0, 10);
    const wantedDate = new Date();
    wantedDate.setDate(wantedDate.getDate() - req.query.days);
    await axios
      .get(
        `https://api.nasdaq.com/api/quote/${
          req.query.symbol
        }/chart?assetclass=stocks&fromdate=${wantedDate
          .toJSON()
          .slice(0, 10)}&todate=${todaysDate}`
      )
      .then((response) => {
        const historyArray = [];
        const datesArray = [];
        const arrayOfObjects = [];
        let newObject = {};
        response.data.data?.chart.forEach((element) =>
          historyArray.push(Number(Number(element.z.value).toFixed(2)))
        );
        response.data.data?.chart.forEach((element) =>
          datesArray.push(element.z.dateTime)
        );
        for (let i = 0; i < datesArray.length; i++) {
          arrayOfObjects.push(
            (newObject = { dateTime: datesArray[i], value: historyArray[i] })
          );
        }
        return res.json({ status: "ok", historicalDate: arrayOfObjects });
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid Call" });
  }
});

app.put("/api/buy", auth, async (req, res) => {
  if (req.body.price == null || req.body.stockCount == null) {
    return res
      .status(400)
      .json({ message: "Stock count or pice not provided" });
  }
  const transactionCost = req.body.price * req.body.stockCount;
  const date = new Date();
  const filterUser = { userName: req.user.userName };
  const user = await User.findOne(filterUser);
  if (!companies.includes(req.body.stockName)) {
    return res.status(400).json({ message: "Invalid company" });
  }
  if (transactionCost > user.balance) {
    return res.status(400).json({ message: "Insufficient funds" });
  }
  const updateBalance = await User.updateOne(
    { _id: user._id },
    { $inc: { balance: -transactionCost } }
  );

  const transactionData = {
    transactionDate: date,
    stockName: req.body.stockName,
    stockCount: req.body.stockCount,
    buyOrSell: false,
    transactionCost: transactionCost,
    stockPrice: req.body.price,
  };

  const updateTransactionHistory = await User.updateOne(
    { _id: user._id },
    { $push: { transactions: transactionData } }
  );
  var stock = user.ownedStocks.find(
    (element) => element.stockName == req.body.stockName
  );
  if (stock) {
    const updatedstock = await User.updateOne(
      { _id: user._id, "ownedStocks.stockName": stock.stockName },
      {
        $inc: {
          "ownedStocks.$.stockCount": req.body.stockCount,
        },
      }
    );
    return res.json({ status: "ok" });
  } else {
    const itemBought = {
      stockName: req.body.stockName,
      stockCount: req.body.stockCount,
    };
    const update = { $push: { ownedStocks: itemBought } };
    const newstock = await User.updateOne({ _id: user._id }, update);
    return res.json({ status: "ok created" });
  }
});

app.put("/api/sell", auth, async (req, res) => {
  if (req.body.price == null || req.body.stockCount == null) {
    return res
      .status(400)
      .json({ message: "Stock count or pice not provided" });
  }
  const filterUser = { userName: req.user.userName };
  const transactionCost = req.body.stockCount * req.body.price;
  const user = await User.findOne(filterUser);
  const date = new Date();
  if (!companies.includes(req.body.stockName)) {
    return res.status(400).json({ message: "Invalid company" });
  }

  const stock = user.ownedStocks.find(
    (element) => element.stockName == req.body.stockName
  );
  if (stock) {
    if (req.body.stockCount <= stock.stockCount) {
      const updateBalance = await User.updateOne(
        { _id: user._id },
        { $inc: { balance: transactionCost } }
      );
      const transactionData = {
        transactionDate: date,
        stockName: req.body.stockName,
        stockCount: req.body.stockCount,
        buyOrSell: true,
        transactionCost: transactionCost,
        stockPrice: req.body.price,
      };
      const updateTransactionHistory = await User.updateOne(
        { _id: user._id },
        { $push: { transactions: transactionData } }
      );
      if (req.body.stockCount == stock.stockCount) {
        const deleteStock = await User.updateOne(
          { _id: user._id },
          { $pull: { ownedStocks: { stockName: stock.stockName } } }
        );
        res.json({ status: "ok" });
      } else {
        const updateStocks = await User.updateOne(
          { _id: user._id, "ownedStocks.stockName": stock.stockName },
          {
            $inc: {
              "ownedStocks.$.stockCount": -req.body.stockCount,
            },
          }
        );
        res.json({ status: "ok" });
      }
    } else {
      res.status(400).json({ message: "You don't have enough stocks" });
    }
  } else {
    return res.status(400).json({ message: "No stocks found" });
  }
});

app.get("/api/usersStocks", auth, async (req, res) => {
  try {
    const filter = { userName: req.user.userName };
    const user = await User.findOne(filter);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json({ status: "ok", stocks: user.ownedStocks });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid request" });
  }
});

app.get("/api/transactionHistory", auth, async (req, res) => {
  try {
    const filter = { userName: req.user.userName };
    const user = await User.findOne(filter);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json({
      status: "ok",
      history: [...user.transactions.reverse()],
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid request" });
  }
});

app.put("/api/changePassword", auth, async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.user.userName,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (req.body.password == req.body.newPassword) {
      return res
        .status(400)
        .json({ message: "New password cannot be the same as old password" });
    }

    const isPasswordRegex = passwordRegExp.test(req.body.newPassword);

    if (!isPasswordRegex) {
      return res.status(400).json({ message: "Invalid new password" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong old password" });
    }
    if (isPasswordValid) {
      const hashedNewPasssword = await bcrypt.hash(req.body.newPassword, 10);

      const updatePassword = await User.updateOne(
        { _id: user._id },
        { password: hashedNewPasssword }
      );
      console.log(updatePassword);
      return res.json({ status: "ok" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "invalid request" });
  }
});

app.put("/api/changeUsername", auth, async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.user.userName,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    try {
      const user1 = await User.findOne({
        userName: req.user.newUsername,
      });
      const oldUsername = req.user.userName;
      const newUsername = req.body.newUsername;
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isPasswordValid) {
        if (oldUsername === newUsername) {
          return res
            .status(400)
            .json({ message: "Old username can't be new username" });
        }

        const isUsernameRegex = loginRegExp.test(newUsername);

        if (!isUsernameRegex) {
          return res.status(400).json({ message: "Invalid new username" });
        }

        const updateUsername = await User.updateOne(
          { _id: user._id },
          { userName: newUsername }
        );
        const token = jwt.sign(
          {
            userName: newUsername,
          },
          process.env.jwtkey
        );

        return res.json({
          status: "ok",
          Newtoken: token,
          userName: newUsername,
        });
      } else {
        return res.status(400).json({ message: "Wrong password" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "this username already exists" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "invalid request" });
  }
});

    app.get("/api/worth", auth, async(req, res) => {
  try{
    const user = await User.findOne({
      userName: req.user.userName,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    let worth = 0;

    for(const i of user.ownedStocks){
      await axios.get(`https://api.nasdaq.com/api/quote/watchlist?symbol=${i.stockName}%7cstocks`)
      .then((response) => {
        worth += i.stockCount*Number(response.data.data[0].lastSalePrice.slice(1));
      });
    }
    console.log(worth);
    return res.json({
      status: "ok",
      worth: worth,
    });
  }catch(error){
    console.log(error);
    return res.status(400).json({ message: "Bad request"})
  }
});

function auth(req, res, next) {
  const authHeder = req.headers["authorization"];
  const token = authHeder.split(" ")[1];
  if (token == null)
    return res.status(400).json({ message: "No token provided" });
  jwt.verify(token, process.env.jwtkey, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
  });
  next();
}

const port = 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
