import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import {
  createComment,
  getCommentsForPost,
  updateComment,
  deleteComment,
} from '../controllers/comments.js';

const commentsRouter = Router();

commentsRouter
  .route('/:id/comments')
  .get(getCommentsForPost)
  .post(verifyToken, createComment);

commentsRouter
  .route('/:id/comments/:commentId')
  .put(verifyToken, updateComment)
  .delete(verifyToken, deleteComment);

export default commentsRouter;
