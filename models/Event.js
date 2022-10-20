import mongoose from 'mongoose'
import Activity from './Activity.js';

const EventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide event name'],
            maxlength: [65, 'Name is too long'],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'Please provide description'],
            maxlength: [250, 'Description is too long'],
        },
        company: {
            type: String,
            required: [true, 'Please provide event company'],
            maxlength: [50, 'Company name is too long'],
        },
        location: {
            type: String,
            required: [true, 'Please provide event location'],
            maxlength: [40, 'Location is too long'],
        },
        date: {
            type: String,
            required: [true, 'Please provide event date'],
            maxlength: 250,
        },
        img: {
            type: String,
            required: [true, 'Please provide event image'],
        },
        coordinates: {
            type: {},
            required: [true, 'Please provide event coordinates'],
        },
        zoom: {
            type: String,
            required: [true, 'Please provide event zoom'],
        },
        paths: {
            type: [],
            required: [true, 'Please provide event path'],
        },
    },
    { timestamps: true }
)



export default mongoose.model('Event', EventSchema)




