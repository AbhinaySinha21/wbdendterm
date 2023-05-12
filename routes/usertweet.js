const express=require("express"); 
const User=require("../models/user")
const Tweet=require("../models/Tweet");
const router=express.Router();
const isloggedin=(req,res,next)=>{
    if(!req.session.user_id)
        return res.redirect("/login");
    next();
}
router.get("/tweet",isloggedin,async(req,res)=>{
    const alltweet= await Tweet.find();
    res.render("index",{alltweet}); 
});

router.post("/add",isloggedin,async(req,res)=>{
    const {text}=req.body;
    await Tweet.insertOne({text});
})


module.exports=router



