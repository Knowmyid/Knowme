import express from 'express';
import { processAadhaarImage } from '../controllers/aadharController.js';


const router = express.Router();

// Route to handle Aadhaar image uploads and processing
router.post('/aadhar', processAadhaarImage);

export default router
