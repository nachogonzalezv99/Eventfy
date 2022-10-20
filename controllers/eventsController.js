import { BadRequestError, NotFoundError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import checkPermissions from '../utils/checkPermissions.js'
import Event from '../models/Event.js'
import Activity from '../models/Activity.js'

const createEvent = async (req, res) => {
    const {
        name,
        description,
        company,
        location,
        date,
        img,
        coordinates,
        zoom,
        paths,
    } = req.body
    if (!name || !description || !company || !location || !date || !img || !coordinates || !zoom || !paths) {
        throw new BadRequestError('Please provide all values')
    }

    console.log(req.user)
    checkPermissions(req.user, null)
    const user = await Event.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })
}

const deleteEvent = async (req, res) => {
    const { id: eventId } = req.params
    const event = await Event.findOne({ _id: eventId })

    if (!event) {
        throw new NotFoundError(`No event with id: ${eventId}`)
    }

    checkPermissions(req.user, null)
   
    await event.remove()
    await Activity.deleteMany({ event_id: eventId });
    res.status(StatusCodes.OK).json({ msg: 'Success! Event removed' })
}

const getAllEvents = async (req, res) => {
  
    let result = Event.find({})


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const events = await result

    const total = await Event.countDocuments({})
    const numOfPages = Math.ceil(total / limit)

    res.status(StatusCodes.OK).json({
        events,
        total,
        numOfPages
    })
}

const updateEvent = async (req, res) => {
    const { id: eventId } = req.params
    const {
        name,
        description,
        company,
        location,
        date,
        img,
        coordinates,
        zoom,
        paths,
    } = req.body
    console.log(req.body)
    if (!name || !description || !company || !location || !date || !img || !coordinates || !zoom || !paths) {
        throw new BadRequestError('Please provide all values')
    }

    const event = await Event.findOne({ _id: eventId })

    if (!event) {
        throw new NotFoundError(`No event with id ${eventId}`)
    }

    checkPermissions(req.user, null)

    const updateEvent = await Event.findOneAndUpdate({ _id: eventId }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(StatusCodes.OK).json({ updateEvent })
}



export { createEvent, deleteEvent, getAllEvents, updateEvent, }

