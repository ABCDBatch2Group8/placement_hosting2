const mongoose=require('mongoose');

const adminSchema=mongoose.Schema({
    email:String,
    password:String,
    designation:{type : String,default:'SubAdmin'},
    status:{type:String,default:'Enable'}
});
var adminModel=mongoose.model('admin',adminSchema);
module.exports=adminModel;