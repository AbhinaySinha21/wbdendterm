const express=require("express");
const mongoose=require("mongoose");
const body=require("body-parser");
const ejs=require("ejs");
const session = require('express-session');
const app=express();
app.use(body.urlencoded({extended: true}));
app.set('view engine','ejs');

mongoose.connect("mongodb://127.0.0.1:27017/tweet-db").then(()=>{
    console.log("Db connected");
});

const sessionConfig = {
    name:'session',
    secret: "hello friend",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000* 60 * 60 * 24 * 7 * 1,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 1,
    }
}

app.use(session(sessionConfig));

const authRoutes=require("./routes/auth_routes");
const tweetroute=require("./routes/usertweet");
app.use(authRoutes);
app.use(tweetroute)
app.use(express.static(__dirname+'/public'));


app.listen(process.env.PORT || 3500,()=>{
    console.log("server is running");
})