const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
const User=require('../model/users');
const { body, validationResult } = require('express-validator');
const Post=require('../model/posts');
const faker=require('faker');



router.get('/',async(req,res)=>{
    try{
        const posts=await Post.find()
        res.status(200).json({
            status:"success",
            data:posts
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })

    }

});

router.post('/',async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.user);
        const post=await Post.create({
            title:req.body.title,
            body:req.body.body,
            image:faker.internet.avatar(),
            user:req.user
        });
        return res.status(200).json({

            status:"success",
            data:post
    
        });

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        });

    }
    
});

router.get('/:id',async(req,res)=>{
    try{
        const posts=await Post.find({user:req.params.id});
        res.status(200).json({
            status:"success",
            data:posts
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
});

router.delete('/',async(req,res)=>{
    try{
        const posts=await Post.deleteOne({title:req.body.title});
        res.status(200).json({
            status:"success",
            data:posts
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })

    }
});

router.put('/',async(req,res)=>{
    try{
        const posts=await Post.updateOne({user:req.user},req.body);
        res.status(200).json({
            status:"success",
            data:posts
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })

    }
});

module.exports=router;