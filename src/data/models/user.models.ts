import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    isEmailSent : {
        type: Boolean,
        required: false,
        default: false
    }
});

export const UserModel = mongoose.model('User', userSchema);