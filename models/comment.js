const mongoose=require('mongoose');
const commentSchema= new mongoose.Schema({
content:{
    type:String,
    required:true
},
creator:{
     type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
},
reactions:[{
    type:mongoose.Schema.Types.ObjectId,
      ref:'React'
  }],
post:{
    type:mongoose.Schema.Types.ObjectId,
       ref:'Post'
       ,required:true
},
comments:[{
        type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
}],
createdAt:{
    type:Date,
    default:Date.now()
}



});
module.exports=mongoose.model('Comment',commentSchema);