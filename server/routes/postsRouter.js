import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} from '../controllers/posts.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(verifyToken, createPost);
postsRouter
  .route('/:id')
  .get(getSinglePost)
  .put(verifyToken, updatePost)
  .delete(verifyToken, deletePost);
postsRouter.post('/:id/like', verifyToken, likePost);
postsRouter.delete('/:id/unlike', verifyToken, unlikePost);

export default postsRouter;
