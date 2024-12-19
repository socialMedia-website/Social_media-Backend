const Post=require('../models/post');
const User= require('../models/user');
const Comment= require('../models/comment');
const React = require('../models/react');
exports.createpost=async (req,res,next)=>{
   try{
    const content= req.body.content;
    const authorId=req.userId;
   

const post = new Post({
content:content,
author:authorId
});
if (req.body.image){
  post.image=req.image;
}
await post.save();
   return res.status(201).json({message:"Post is created successfully!"});
   }
   catch(err){
    err.statuscode(500);
    next(err);
   }
};

exports.Editpost=async(req,res,next)=>{
const postId=req.body.postId;
try{
const post= await Post.findById(postId);
if (req.body.content){
    post.content=req.body.content;
}
if (req.body.image){
    post.image=req.body.image;
}
await post.save();
  return res.status(201).json({message:"Post is Updated successfully!"});
}
catch(err){
    err.statuscode(500);
    next(err);
   }
};
exports.removepost=async (req,res,next)=>{
    const postId=req.params.postId;
    try{
   const post= await Post.findByIdAndDelete(postId);
   res.status(200).json({message:"Post is deleted successfully!"});
}

 catch(err){
    err.statuscode(500);
    next(err);
   }
};
exports.getTimelinePosts=async(req,res,next)=>{
const user= await User.findById(req.userId);

};



exports.commentonpost=async(req,res,next)=>{
    const userId= req.userId;
    const postId= req.params.postId;
    const content=req.body.content;
    
    const post =Post.findById(postId);
    
    if (!post){
        return res.status(401).json({message:"post is not found"});
    }
    const comment=new Comment({
        content:content,
        creator:userId,
        post:postId
         });
await comment.save();
    post.comments.push(comment._id);
    await post.save();
    res.status(200).json({message:"comment is created."});
};

exports.getcomments=async(req,res,next)=>{
 const postId=req.params.postId;
    try{
   const post= await Post.findById (postId);
    res.status(200).json({message:"we get post comments successfully",
        comments:post.comments
    });
    }
    catch(err){
    err.statuscode(500);
    next(err);
   }
};
exports.getPostReactions=async(req,res,next)=>{
const postId= req.params.postId;
try{
   const post= await Post.findById (postId);
   const Love=await find( post.reactions.type=="Love");
   const Like=await find( post.reactions.type=="Like");
   const Angry= await find( post.reactions.type=="Angry");
   const Sad=await find( post.reactions.type=="Sad");
   const Care=await find( post.reactions.type=="Care");
    res.status(200).json({message:"we get post reactions successfully",
        reactions:post.reactions,
        Love,Like,Sad,Angry,Care
    });
    }
    catch(err){
    err.statuscode(500);
    next(err);
   }

};
// Like a post
exports.reactPost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId);
      const reactType=req.body.type;
      const author =req.userId;
      const react=new React({
        type:reactType,
        author:author
      });
      await react.save();
      if (!post){
    return res.status(401).json({message:"post is not found"});
       }
       const userWhoReact= await find(post.reactions.author==req.userId)
        if (!userWhoReact) {
            post.reactions.push(react);}
            else{
           //عايزة اجيب الريأكت واغير نوعه
            }
            await post.save();
            res.status(200).json({ message: 'Post liked.' });
        // } else {
        //     res.status(400).json({ message: 'Post already liked.' });
        // }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getCommentReactions=async(req,res,next)=>{
    const postId= req.params.postId;
    const commentId=req.params.commentId;
    try{
       const post= await Post.findById (postId);
       const comment= await Comment.findById(commentId);
       const Love=await find( comment.reactions.type=="Love");
       const Like=await find( comment.reactions.type=="Like");
       const Angry= await find( comment.reactions.type=="Angry");
       const Sad=await find( comment.reactions.type=="Sad");
       const Care=await find( comment.reactions.type=="Care");
        res.status(200).json({message:"we get comment reactions successfully",
            reactions:comment.reactions,
            Love,Like,Sad,Angry,Care
        });
        }
        catch(err){
        err.statuscode(500);
        next(err);
       }
    
    };
