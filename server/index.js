import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import aadharRoutes from './routes/aadharRoutes.js';
import scannedDataRoutes from './routes/scannedDataRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Setup Multer for file uploads
const upload = multer({ dest: 'uploads/' });


app.use('/api/upload', upload.single('aadhaar'), aadharRoutes);
app.use('/', scannedDataRoutes); 
app.use('/', userRoutes);

// Define the port 
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



