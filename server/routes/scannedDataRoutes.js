import express from 'express';
const router = express.Router();
import { trackScan, fetchData } from '../controllers/scannedDataController.js';



router.get('/track-scan/:qrId', trackScan);
router.get('/api/qrData/:qrId', fetchData );

export default router
