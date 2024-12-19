const jwt =require('jsonwebtoken');
 const isAuth= (req, res, next)=>{
const Authheader= req.get('Authorization');
if (!Authheader){
    const err= new Error('Not Authorized ');
    err.statusCode=401;
    next(err);
}
const token =Authheader.split(' ')[1];
console.log(token);
let decodedToken;
try {
  decodedToken = jwt.verify(token, process.env.JWT_SECRET);
} catch (error) {
  next(error);
}
if (!decodedToken) {
    const err= new Error('Not Authorized ');
    err.statusCode=401;
    next(err);
}
req.userId = decodedToken._id;
next();
 };
 module.exports=isAuth;