const mongoose=require('mongoose');
const requestSchema= new mongoose.Schema({
    requester:{
      type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recipient:{
       type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['pending','accepted','declined'],
        default:'pending'
    }
    ,createdAt:{
        type:Date,
        default:Date.now()
    }
})