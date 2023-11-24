import {getPosts, addPost} from '../controllers/post.js';
import express from 'express';

const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);

export default router;