const mongoose=require("mongoose");

const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema=new mongoose.Schema({
    _id:Number,
    name:{type:String,required:true},
    supervisor:{type:mongoose.ObjectId,ref:"teachers"},
    children:{type:[Number],ref:"childern"}
});

schema.plugin(AutoIncrement,{id: 'class_id', inc_field: "_id"});
mongoose.model("classes",schema);