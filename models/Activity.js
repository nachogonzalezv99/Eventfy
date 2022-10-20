import mongoose from 'mongoose'

const ActivitySchema = new mongoose.Schema(
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
        category: {
            type: String,
            enum: ['Comida', 'Tienda', 'Concierto', 'Servicio'],
            default: "Comida"
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide an user'],
        },
        event_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Please provide an event'],
        },
        img: {
            type: String,
            required: [true, 'Please provide event image'],
        },
        coordinates: {
            type: {},
            required: [true, 'Please provide event coordinates'],
        },
    },
    { timestamps: true }
)


export default mongoose.model('Activity', ActivitySchema)




