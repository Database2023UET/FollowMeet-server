import {getPostsUserFollowing, addPost} from '../controller/post.js';
import express from 'express';

const router = express.Router();

router.get('/getPosts', getPostsUserFollowing);
router.post('/addPost', addPost);

export default router;