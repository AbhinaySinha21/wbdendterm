const express=require("express"); 
const User=require("../models/user")
const bcrypt=require("bcrypt");
const router=express.Router();
router.get("/signup",(req,res)=>
{ 
    res.render("signup"); 

})
router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const loguser=await User.find({username: username});
    console.log(password, loguser[0].password);
    if(!loguser)
        return res.redirect("/signup");
    const valid=bcrypt.compare(password,loguser[0].password);
    if(valid)
    {
        req.session.user_id=loguser[0]._id;
        return res.redirect("/tweet");
    }
    return res.redirect("/");
})
router.post("/signup",async(req,res)=>{
    const {username, password, img} = req.body;
    const salt = await bcrypt.genSalt(12);
    const hash= await bcrypt.hash(password,salt);
    await User.create({username,password: hash,img});
    res.redirect("/login");
});


module.exports=router;
