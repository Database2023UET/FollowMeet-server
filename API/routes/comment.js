import { getComments, addComment, getNumComments } from '../controller/comment.js';
import express from 'express';

const router = express.Router();

router.get('/getComments', getComments);
router.post('/addComment', addComment);
router.get('/getNumComments', getNumComments);

export default router;