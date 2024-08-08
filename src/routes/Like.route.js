import { postLike, commentLike } from '../controllers/Like.controller.js';
import express from 'express'; 
import asyncHandler from 'express-async-handler';

export const likeRouter = express.Router({mergeParams: true});

likeRouter.post('/:postId/posts',asyncHandler(postLike))
likeRouter.post('/:commentId/comments',asyncHandler(commentLike))