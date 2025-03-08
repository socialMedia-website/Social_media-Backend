
const bcryptjs = require("bcryptjs");
const User=require("../models/user");

    
  exports.editpassword=async(req,res,next)=>{
    try{
       const {oldPassword,newPassword,verifyiedNewPassword}=req.body;
       const user= await User.findById(req.userId);
       if (!user){
       return res.status(404)
        .json({
          message:"User is not found!"
        });
       }
        const result =await bcryptjs.compare(oldPassword,user.password);
      
        if (!result){
         return res.status(400)
          .json({
            message:"old password is not true"
          });
        }
        if (newPassword!==verifyiedNewPassword){
         return res.status(400)
          .json({
            message:"New password and its verifycation password is not equal"
          });

        }
        const HashedNewPassword= await bcryptjs.hash(newPassword,12);
        user.password=HashedNewPassword;
        await user.save();
       return res.status(201)
        .json({
          message:" password is updated successfully"
        });
      } catch (error) {
       return next(error)
       }
        };
  
        exports.getUserProfile = async (req, res) => {
          try {
            const user = await User.findById(req.userId).select("-password");
            if (!user) return res.status(404).json({ message: "User not found" });
        
           return res.json(user);
          } catch (error) {
            next(error)
           }
        };


      exports.uploadProfilePhoto = async (req, res) => {
              try {
                const user = await User.findById(req.userId);
                if (!user) return res.status(404).json({ message: "User not found" });
            
                if (user.profilePicture) {
                  user.oldProfilePictures.push(user.profilePicture);
                }
            
                user.profilePicture = `/uploads/profiles/${req.file.filename}`;
                await user.save();
            
             return   res.json({ message: "Profile photo updated successfully", user });
              } catch (error) {
                next(error)
               }
            };


            exports.editName=async(req,res,next)=>{
              try{
              const {firstname,lastName}=req.body;
              const user = await User.findById(req.userId)
              if (!user) return res.status(404).json({ message: "User not found" });
              user.firstName=firstname;
              user.lastName=lastName;
              await user.save();
            return res.status(200)
            .json({ message: "User name is updated successfully" });
          
          } catch (error) {
           next(error)
          }

            };