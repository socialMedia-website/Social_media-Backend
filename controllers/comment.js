const Post=require('../models/post');
const User= require('../models/user');
const Comment= require('../models/comment');
const React = require('../models/react');
const { authenticateUser } = require('../middleware/is-Auth');
//const { handleImageUpload } = require('../middlewares/imageUploadMiddleware');


// create comment  done
exports.commentonpost=async(req,res,next)=>{
    try{
    const userId= req.userId;
    const postId= req.params.id;
    const content=req.body.content;
    if (!content){
        return res.status(401).json({message:"content not allowed to be empty"});
    }
    const post = await Post.findById(postId);
    
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
        }
        catch(err){
            err.statuscode(500);
            next(err);
           }
};

exports.getcommentById=async(req,res,next)=>{
 const postId=req.params.id;
 const commentId=req.params.CommentId;
    try{
   const comment= await Comment.findById (commentId);
   if (!comment){
    return res.status(401).json({message:"comment is not found"});
       }
    res.status(200).json({message:"we get comment successfully",
        comment:comment
    });
    }
    catch(err){
    err.statuscode(500);
    next(err);
   }
};
//get post all comments
exports.getcomments=async(req,res,next)=>{
 const postId=req.params.id;
    try{
   const post= await Post.findById (postId);
   if (!post){
    return res.status(401).json({message:"post is not found"});
       }
    res.status(200).json({message:"we get post comments successfully",
        comments:post.comments
    });
    }
    catch(err){
    err.statuscode(500);
    next(err);
   }
};
//remove comment from the post
exports.removeComment = async (req, res, next) => {
    const commentId = req.params.CommentId;
    const postId=req.params.id;
    try {
        // Find the comment to delete
        const comment = await Comment.findById(commentId);
      

        if (!comment) {
            return res.status(404).json({ message: "comment not found!" });
        }

    
        await Post.findOneAndUpdate(
            { _id: postId },
            { $pull: { comments: commentId } }, 
            { new: true }
        );
   

        // Remove all reactions related to the comment
        await React.deleteMany({ comment: commentId });

        
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ message: "comment and its reactions are deleted successfully!" });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

exports.updateComment = async (req, res, next) => {
    const commentId = req.params.CommentId;
    const postId=req.params.id;
    const content =req.body.content;
    try {
        // Find the comment to update
        const comment = await Comment.findById(commentId);
      

        if (!comment) {
            return res.status(404).json({ message: "comment not found!" });
        }

    comment.content=content;
      await comment.save();

    

        res.status(200).json({ message: "comment is updated successfully!" });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

// react to comment 
exports.reactToComment = async (req, res, next) => {
    try {
        const postId=req.params.id;
        const commentId = req.params.CommentId; 
        const { type } = req.body; 
        

        
        const comment = await Comment.findById(commentId).populate('reactions');

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

       
        const existingReaction = comment.reactions.find(
            r => r.author.toString() === req.userId
        );

        if (existingReaction) {
      
            existingReaction.type = type;
        } else {
          
            const newReaction = new React({
                type:type,
                author:req.userId,
                comment:commentId,
                post:postId
            });
        await  newReaction.save();
            comment.reactions.push(newReaction);
        }

        
        await comment.save();

        res.status(200).json({ message: 'Reaction updated successfully', reactions: comment.reactions });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};


exports.getCommentReactions = async (req, res, next) => {
   
    const commentId =req.params.CommentId;
    try {
       
        const comment = await Comment.findById(commentId).populate('reactions');
        
   console.log(comment)
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        
        const reactionsSummary = comment.reactions.reduce((acc, r) => {
            acc[r.type] = (acc[r.type] || 0) + 1;
            console.log( acc )
            return acc;
        }, {});

        res.status(200).json({ reactionsSummary });

    } catch (err) {
        err.statusCode = 500;  
        next(err);
    }
};