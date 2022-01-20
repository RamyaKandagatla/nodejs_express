const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const app=express();
app.use(bodyparser());
const User=require('../model/users');
var jwt = require('jsonwebtoken');
app.use(express.urlencoded({ extended: true })); 

const userroutes=require('../routes/user');
const loginroutes=require('../routes/login');
const postroutes=require('../routes/posts');


const secret="RESTAPI";

mongoose.connect('mongodb://localhost:27017/Insta');




app.use("/api/v1/posts",async(req,res,next)=>{
    
    try{
        const token=req.headers.authorization.split("test ")[1];
    console.log(token);
    if(!token){
        return res.json({
            status:"failed",
            message:"Token not authenticated"
        })
    }
    jwt.verify(token, secret, async function(err, decoded) {
        console.log(err,decoded);
        if(err){
            return res.json({
                status:"failed",
                message:"Invalid token"
            })
        }
        const user=await User.findOne({_id:decoded.data});
        console.log(user);
        req.user=user._id;
        next(); // bar
      });
    }catch(e){
        req.status(400).json({
            status:"failed",
            message:"Token not authenticated"
        })

    }
    
});


app.use('/api/v1/users',userroutes);
app.use('/api/v1/',loginroutes);
app.use('/api/v1/posts',postroutes);



app.listen(3000,()=>console.log("server started"));
