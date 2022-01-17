const mongoose=require('mongoose');
const schema=mongoose.Schema;

const userschema=new schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    isPromoted:{
        type:Boolean,
        default:null
    }
});

const Mongo=mongoose.model('Mongo',userschema);

module.exports=Mongo;