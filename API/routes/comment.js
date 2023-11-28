import { getComments, addComment } from '../controller/comment.js';
import express from 'express';

const router = express.Router();


router.get('/getComments', getComments);
router.post('/addComment', addComment);

export default router;