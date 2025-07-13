const { createContainer, asClass } = require('awilix');
const UserRepository = require('../repositories/User.repository');
const UserService = require('../services/User.service');
const UserController = require('../controllers/User.controller');
const AuthRepository = require('../repositories/Auth.repository');
const AuthService = require('../services/Auth.service');
const AuthController = require('../controllers/Auth.controller');
const PostRepository = require('../repositories/Post.repository');
const PostService = require('../services/Post.service');
const PostController = require('../controllers/Post.controller');
const StoryRepository = require('../repositories/Story.repository');
const StoryService = require('../services/Story.service');
const StoryController = require('../controllers/Story.controller');
const CommentRepository = require('../repositories/Comment.repository');
const CommentService = require('../services/Comment.service');
const CommentController = require('../controllers/Comment.controller');
const FriendRepository = require('../repositories/Friend.repository');
const FriendService = require('../services/Friend.service');
const FriendController = require('../controllers/Friend.controller');
const ReactionRepository = require('../repositories/Reaction.repository');
const ReactionService = require('../services/Reaction.service');
const ReactionController = require('../controllers/Reaction.controller');

const container = createContainer();

container.register({
  userRepository: asClass(UserRepository).singleton(),
  userService: asClass(UserService).singleton(),
  userController: asClass(UserController).singleton(),
  authRepository: asClass(AuthRepository).singleton(),
  authService: asClass(AuthService).singleton(),
  authController: asClass(AuthController).singleton(),
  postRepository: asClass(PostRepository).singleton(),
  postService: asClass(PostService).singleton(),
  postController: asClass(PostController).singleton(),
  storyRepository: asClass(StoryRepository).singleton(),
  storyService: asClass(StoryService).singleton(),
  storyController: asClass(StoryController).singleton(),
  commentRepository: asClass(CommentRepository).singleton(),
  commentService: asClass(CommentService).singleton(),
  commentController: asClass(CommentController).singleton(),
  friendRepository: asClass(FriendRepository).singleton(),
  friendService: asClass(FriendService).singleton(),
  friendController: asClass(FriendController).singleton(),
  reactionRepository: asClass(ReactionRepository).singleton(),
  reactionService: asClass(ReactionService).singleton(),
  reactionController: asClass(ReactionController).singleton(),
});

module.exports = container;