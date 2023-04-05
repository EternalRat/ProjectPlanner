import express from 'express';
import auth from './auth';
import todo from './todo';
const router = express.Router();

router.use('/auth', auth);
router.use('/todo', todo);

export default router;
