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
  }
  ,
  friendsRequests:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
 }],
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
 }],
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

userSchema.pre('save',async function(next){
  if (!this.isModified('password'))
    return next();
  const salt= await bcrypt.genSalt(12);
   this.password= await bcrypt.hash(this.password,salt);
   next();
});

module.exports = mongoose.model('User', userSchema);
