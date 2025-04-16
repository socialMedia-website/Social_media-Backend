const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String  }, //  profile picture
  oldProfilePictures: [{ type: String }], // Stores old profile pictures
  birthday: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  friends:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User'
  }],
  bio:{
    type:String,
    default:''
  },
  isOnline:{ type: Boolean, default: false },
  lastSeen:{ type: Date }
  ,
  friendsRequests:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
 }],
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
 }],
 publicKey: String,
  passwordResetToken:{  type: String},
tokenExpiration:{ type:Date},
  createdAt: { type: Date, default: Date.now() },
});
userSchema.methods.correctpasssword= async function (enteredpassword,userpassword){
 return await bcrypt.compare(userpassword,enteredpassword);
};

userSchema.methods.createToken= function(){

  const resetToken = crypto.randomBytes(12).toString('hex');
  this.passwordResetToken=resetToken ;
  this.tokenExpiration=Date.now()+ process.env.RESET_TOKEN_EXPIRESION;
 
return resetToken;
};



module.exports = mongoose.model('User', userSchema);
