const mongoose=require('mongoose');

userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, unique:true , required:true,index:true },
    password:{type:String,required:true}
})

const User=mongoose.model('User',userSchema);    //this User will creates document with users ,it will take to lower case and plural form //
module.exports=User;