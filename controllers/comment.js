const Post=require('../models/post');
const User= require('../models/user');
const Comment= require('../models/comment');
const React = require('../models/react');
const { authenticateUser } = require('../middleware/is-Auth');
//const { handleImageUpload } = require('../middlewares/imageUploadMiddleware');


// create comment
exports.commentonpost=async(req,res,next)=>{
    try{
    const userId= req.userId;
    const postId= req.query.postId;
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
//remove comment from the post
exports.removeComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    try {
        // Find the comment to delete
        const comment = await Post.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "comment not found!" });
        }

      

        // Remove all reactions related to the comment
        await React.deleteMany({ comment: commentId });

        
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ message: "comment and its reactions are deleted successfully!" });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

// react to comment 
exports.reactToComment = async (req, res, next) => {
    try {
        const commentId = req.query.commentId; 
        const { type , postId} = req.body; 
        

        
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
   
    const commentId = req.query.commentId;
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