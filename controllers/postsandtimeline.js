const Post=require('../models/post');
const User= require('../models/user');
const Comment= require('../models/comment');
const React = require('../models/react');
const { authenticateUser } = require('../middleware/is-Auth');
//const { handleImageUpload } = require('../middlewares/imageUploadMiddleware');
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

exports.getTimelinePosts=async(req,res,next)=>{
const user= await User.findById(req.userId);
/*const posts = await Post.find({ author: { $in: user.following } }).populate('author');
res.status(200).json(posts);
*/
};
//done
exports.removepost = async (req, res, next) => {
    const postId = req.query.id;
    console.log(postId);
    try {
        // Find the post to delete
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found!" });
        }

        // Remove all comments related to the post
        await Comment.deleteMany({ post: postId });

        // Remove all reactions related to the post
        await React.deleteMany({ post: postId });

        
        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post and its comments and reactions are deleted successfully!" });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};





//not tested yet

exports.getcomments=async(req,res,next)=>{
 const postId=req.params.postId;
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

// react a post(done)

exports.reactPost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId).populate('reactions'); 
        if (!post) {
            return res.status(401).json({ message: "Post not found" });
        }

        const reactType = req.body.type;

        
        const existingReact = post.reactions.find(r => r.author.toString() === req.userId);

        if (existingReact) {
            
            existingReact.type = reactType;
            await existingReact.save(); 
        } else {
           
            const react = new React({
                type: reactType,
                author: req.userId,
                post: post._id,
            });
            await react.save(); 

            post.reactions.push(react);
        }

        await post.save(); 
        res.status(200).json({ message: 'Reaction updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



//done
exports.getPostReactions=async(req,res,next)=>{
    const postId= req.query.postId;
   
    try {
       
        const post = await Post.findById(postId).populate('reactions'); 
        
   
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        
        const reactionsSummary = post.reactions.reduce((acc, r) => {
            acc[r.type] = (acc[r.type] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({ reactionsSummary });

    } catch (err) {
        err.statusCode = 500;  
        next(err);
    }
    
    };



// handle reaction and post deletion and comment 
// re look to react model