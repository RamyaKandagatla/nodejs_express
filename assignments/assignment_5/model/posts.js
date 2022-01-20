const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const postSchema=new Schema({
    title:{type:String,required:true},
    body:{type:String, required:true },
    image:{type:String},
    user:{type:Schema.Types.ObjectId,ref:'User'}
})

const Post=mongoose.model('post',postSchema);    //this User will creates document with users ,it will take to lower case and plural form //
module.exports=Post;