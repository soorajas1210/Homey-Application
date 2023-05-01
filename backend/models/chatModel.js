const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
members:{
    type:Array,
},
serviceId:{
    type:String,
    required:true,
}},
{
    timestamps:true,
}


);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
