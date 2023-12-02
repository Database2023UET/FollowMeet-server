import {getUserInfos} from '../controller/user.js';
import express from 'express';

const router = express.Router();

router.post('/getUserInfos', getUserInfos);

export default router;