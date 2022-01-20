const bodyParser = require('body-parser');
const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../model/users');

router.post('/',body('email').isEmail(),body('name').isAlpha(),async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const user = await User.create(req.body);
        res.status(200).json({
            status:'success',
            data:user
        });

    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })

    }
    
});

router.get('/',async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            status:'success',
            data:users
        });

    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })

    }
    
});

router.get('/:id',body("id").isMongoId(),async(req,res)=>{
    try{
        const users = await User.find({_id:req.params.id});
        res.status(200).json({
            status:'success',
            data:users
        });

    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
});

router.put('/:id',async(req,res)=>{
    console.log(req.body);
    try{
        const users = await User.findByIdAndUpdate({_id:req.params.id},
            req.body,{new:true});
        res.status(200).json({
            status:'success',
            data:users
        });

    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const users = await User.deleteOne({_id:req.params.id});
        res.status(200).json({
            status:'success',
            data:users
        });

    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
});

module.exports=router;
