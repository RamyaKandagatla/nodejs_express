const express=require('express');

const mongoose=require('mongoose');
const users=require('./model/Mongo');
const bodyparser=require('body-parser');
var methodOverride = require('method-override');
mongoose.connect('mongodb://localhost:27017/Usersdb');
const app=express();

app.use(methodOverride('_method'))
app.use(bodyparser());


app.use(express.static("public"));

app.set('views','./views');
app.set('view engine','ejs');

app.get('/',async(req,res)=>{
    // write code to fetch data

    var data = await users.find();
    console.log(data);
    res.render('home',{data});
})

app.get('/form',(req,res)=>{
    res.render('form');
})



app.post('/users/add',async(req,res)=>{
    console.log(req.body);
    await users.create({
        name:req.body.name,
        email:req.body.email,
        isPromoted:null
    })
    res.redirect('/');
})

app.put('/users/:id',async(req,res)=>{

    const idval = req.params.id
    const user = await users.find({_id: idval})
    // console.log(user)
    if (user[0].isPromoted === null || user[0].isPromoted === false){
        await users.updateOne({_id:idval},{isPromoted:true})
    }
    else{
        await users.updateOne({_id:idval},{isPromoted:false})
    }
    res.redirect('/')

})

app.delete('/users/:id',async(req,res)=>{
    
    await users.deleteOne({_id:req.params.id})
    res.redirect('/');
})

app.listen(3000,()=>console.log('server is listening'));