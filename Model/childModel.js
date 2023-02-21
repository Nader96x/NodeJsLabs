const mongoose=require("mongoose");

const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema=new mongoose.Schema({
    _id:Number,
    fullName:{type:String,required:true},
    age:Number,
    level:String,
    address:{
        city:String,
        street:String,
        building:Number
    }
});
schema.plugin(AutoIncrement,{id: 'child_id', inc_field: "_id"});
mongoose.model("childern",schema);