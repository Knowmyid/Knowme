import express from 'express';
import { fetchUserData, fetchUserShares } from '../controllers/userController.js';

const router = express.Router();

router.get('/api/userData', fetchUserData); 
router.get('/api/userShares', fetchUserShares); 


export default router;