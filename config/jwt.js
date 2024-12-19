
const jwt=require('jsonwebtoken');
const creatJWT=(userId)=>{
const token =jwt.sign({
    _id:userId
},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
return token;
};
module.exports = creatJWT;
