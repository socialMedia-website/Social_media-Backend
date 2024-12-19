const usercontroller=require('../controllers/user');
const express=require('express');
const userrouter=express.Router();

userrouter.post('/edit-profile',usercontroller.edituser);
userrouter.post('/edit-password',usercontroller.editpassword);
userrouter.post('/upload-profile',usercontroller.uploadprofile);

module.exports=userrouter;