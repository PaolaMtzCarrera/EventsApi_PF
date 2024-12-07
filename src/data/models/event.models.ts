import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

export const EventModel = mongoose.model('Event', eventSchema);