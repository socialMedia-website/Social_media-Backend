const User=require('../models/user');
const creatJWT=require('../config/jwt');
const bcrypt=require('bcryptjs');
const sendEmail=require('../config/sendEmail');

exports.register=async (req,res,next)=>{
   
const {firstName,lastName, email,password, birthday,gender}=req.body;
const hashedPassword = await bcrypt.hash(password, 12);
const user= new User({
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:hashedPassword,
    birthday:birthday,
    gender:gender

});
const saveduser =await user.save();
if (!saveduser){
const err=new Error('can not save user');
next(err);
}
res
.status(200)
.json('user sign up successfully, now you can login ');
};

exports.login=async (req,res,next)=>{
    const { email,password}=req.body;
    const user = await User.findOne({email:email});
    if (!user){
      res
     .status(404)
     .json('could not find user with this email , you can try to sign up');
    }
    const isEqual= user.correctpasssword(password,user.password);
    if (isEqual){
        // create json web token
       const token= creatJWT(user._id);
        res
        .status(200)
        .json({message:'user loged in successfully', data:{token:token, userId:user._id}});
    }
    else {
        res
        .status(200)
        .json('user password is not correct');
    }
};

exports.forgotpassword=async (req,res,next)=>{
    const email=req.body.email;
 
    let copyuser;
    try{
  const user=  User.findOne({email:email});
  
  if (!user){
    const err=new Error ('could not find user with this email!');
    err.statusCode=404;
    next(err);
  }

  const resetToken=  user.createToken();
  if (!resetToken){
    const err=new Error ('could not find resettoken');
    err.statusCode=404;
    next(err);
  }
  await user.save();

  copyuser=user;
  const resetURL=`${req.protocol}://${req.post('host')}/api/auth/resetPassword/${resetToken}`;
const message =`forgot your password? submit a patch request with new password to 
:${resetURL} \n if you did not forgot your password ignore this email `;
 
await sendEmail(email ,message);

res.status(200).json({
   
    message: 'Token sent to email!'
  });
}
    
    catch(err){
      //  copyuser.passwordResetToken=undefined;
      //  copyuser.tokenExpiration=undefined;
       // await copyuser.save();
      //  const err=new Error ('there is an error sending email ');
        err.statusCode=500;
     next(err);
    }

};

exports.resetpassword=async (req,res,next)=>{
   const password=req.body.password;
   const confirmpassword=req.body.confirmpassword;
   const token=req.params.resetToken;
   if (password != confirmpassword){
    const err=new Error ('confirm password not equal new password');
        err.statusCode=500;
        next(err);
}
   const user= await User.findOne({
    passwordResetToken:token,
    tokenExpiration:{$gt:Date.now()}
});
if (!user){
    const err=new Error ('could not find user ,try again');
        err.statusCode=404;
        next(err);
}
user.password=password;
await user.save();
res.status(200)
.json({
    message: 'password is reset successfully.'
  });

};