const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    _id:mongoose.ObjectId,
    fullname:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    image:String
});

mongoose.model("teachers",schema);