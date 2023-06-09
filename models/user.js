const mongoose = require("mongoose");


const userSchema=new mongoose.Schema({
    username: String,
    password: String,
    img: String,
    like:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Tweet'
        }
    ],
    message:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Tweet'
        }
    ]
});


const User=mongoose.model("User",userSchema);
module.exports=User