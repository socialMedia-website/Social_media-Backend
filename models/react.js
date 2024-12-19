const monggose=require('mongoose');
const likeschema=new monggose.Schema({
type:{
    type:String,
    enum:['Like','Love','Angry','Sad','Care'],
    default:'Like'
},
 author:{
        type:monggose.Schema.Types.ObjectId,
          ref:'User'
      }
,
createdAt: { type: Date, default: Date.now() }

});
module.exports=monggose.model('React',likeschema);