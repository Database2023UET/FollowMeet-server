import {getUserInfos} from '../controller/user.js';
import express from 'express';

const router = express.Router();

router.get('/getUserInfos', getUserInfos);

export default router;