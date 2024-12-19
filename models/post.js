const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true

    },
    image:{
        type:String
    },
    reactions:[{
      type:mongoose.Schema.Types.ObjectId,
        ref:'React'
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
          ref:'User'
      },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'

    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model('Post',postSchema);