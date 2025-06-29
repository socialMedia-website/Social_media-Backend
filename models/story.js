const mongoose = require ('mongoose');

const storySchema= new mongoose.Schema({
    content:{
        type:String ,
        required:true
    },
    image :{
        type:String
    },
    creator:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true,
    },
     createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports=mongoose.model('Story',storySchema);