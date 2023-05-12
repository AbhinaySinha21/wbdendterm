const mongoose=require("mongoose");


const tweetSchema={
    img: String,
    parentid: String,
    tweet: String,
    likecounter: Number
}

const tweet=new mongoose.Schema(tweetSchema);

const Tweet=mongoose.model("Tweet",tweet);


module.exports=Tweet;