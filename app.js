require('dotenv').config()
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")

app.use(express.json())

const posts = [
  {
    userName: "Bharat",
    age: 28,
  },
  {
    userName: "Jitesh",
    age: 25,
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json({ status: true, message: "this is psot endpoint1", data: posts, user: req.user });
});

app.post("/login", (req, res) => {
    const userName = "Bharat"
    console.log("req.body- ",req.body)
    const accessToken = jwt.sign( userName, process.env.ACCESS_TOKEN)
    res.json({accessToken:accessToken});
    // res.json({"test":1112})
});

function authenticateToken( req, res, next ){
    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(" ")[1]
    if( token == null) return res.status(401).send({ success: false, message: 'Failed to authenticate token' });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) =>{
        if(err)
            return res.status(403).send({ success: false, message: 'Invalid token' });
        req.user = user
        next()
        
    })
}

app.listen(4500)