import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    aadhaarData: { type: Object, required: true }, // Stores encrypted Aadhaar data
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
