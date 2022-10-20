import { BadRequestError, NotFoundError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import checkPermissions from '../utils/checkPermissions.js'
import Activity from '../models/Activity.js'
import User from "../models/User.js"
import Event from "../models/Event.js"
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const createActivity = async (req, res) => {
    const {
        name,
        description,
        category,
        user_id,
        event_id,
        img,
        coordinates
    } = req.body

    if (!name || !description || !category || !user_id || !event_id || !img || !coordinates) {
        throw new BadRequestError('Please provide all values')
    }

    if (req.user.role === 'user') {
        throw new UnAuthenticatedError('Not authorized to access this route')
    }

    const activity = await Activity.create(req.body)
    res.status(StatusCodes.CREATED).json({ activity })
}

const deleteActivity = async (req, res) => {
    const { id: activityId } = req.params
    const activity = await Activity.findOne({ _id: activityId })

    if (!activity) {
        throw new NotFoundError(`No activity with id: ${eventId}`)
    }
    /*4- La funcion checkPermisions solo deja proceder si se es admin o, si se es manager,
    solo cuando se borre una actividad creada por él*/
    checkPermissions(req.user, activity.user_id)
    await activity.remove()

    res.status(StatusCodes.OK).json({ msg: 'Success! Activity removed' })
}

const getAllActivities = async (req, res) => {

    /* 1- aplicamos filtros*/
    const { event, search, sort, categories, pagination } = req.query

    const queryObject = {}

    let allCategories = null

    if (event) {
        queryObject.event_id = event

        allCategories = await Activity.aggregate([
            {
                $match: { event_id: new mongoose.Types.ObjectId(event) }
            },
            {
                $group: {
                    _id: "$category"
                },
            },
            { $sort: { _id: 1 } }
        ]);
        allCategories = allCategories.map(item => {
            return item['_id']
        })

    } else {
        /* si estamos listando desde el panel de administrador y existe un usuario 
        con el rol de manager, que solo se listen las actividades que el ha creado
        */
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnAuthenticatedError('Authentication invalid')
        }
        const token = authHeader.split(' ')[1]
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            const { role, _id } = await User.findOne({ _id: payload.userId })
            if (role == 'manager') {
                queryObject.user_id = _id
            }
        } catch (error) {
            console.log("no user")
        }
    }

    if (search) {
        queryObject.name = { $regex: search, $options: 'i' }
    }

    if (categories) {
        if (categories !== 'all' || !categories.length) {
            const array1 = categories.split(",")
            console.log(array1)
            queryObject.category = { $in: array1 }
        }
    }

    let result = Activity.find(queryObject)


    /*2- ordenamos resultados filtrados*/
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }

    if (sort === 'a-z') {
        /*collation es para que ordene sin tener encuenta las mayusculas y minusculas*/
        result = result.collation({ 'locale': 'en' }).sort('name')
    }
    if (sort === 'z-a') {
        result = result.collation({ 'locale': 'en' }).sort('-name')
    }

    /*3- obtenemos el total y las actividades por página*/
    let total = await Activity.countDocuments(queryObject)

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    if (pagination) {
        result = result.skip(skip).limit(limit)
    }

    const activities = await result.lean()

    const numOfPages = Math.ceil(total / limit)

    /*4- Añadimos el username y el eventName a cada actividad para facilitar el frontend*/
    const activitiesWithUser = await Promise.all(activities.map(async (activity) => {
        const user = await User.findById(activity.user_id).lean()
        const event = await Event.findById(activity.event_id).lean()
        return { ...activity, username: user.name, eventName: event.name }
    }))

    res.status(StatusCodes.OK).json({
        activities: activitiesWithUser,
        total,
        numOfPages,
        allCategories,
    })
}

const updateActivity = async (req, res) => {
    const { id: activityId } = req.params
    const {
        name,
        description,
        category,
        event_id,
        img,
        coordinates
    } = req.body
    if (!name || !description || !category || !event_id || !img || !coordinates) {
        throw new BadRequestError('Please provide all values')
    }

    const activity = await Activity.findOne({ _id: activityId })

    if (!activity) {
        throw new NotFoundError(`No activity with id ${activityId}`)
    }
    /*4- La funcion checkPermisions solo deja proceder si se es admin o, si se es manager,
    solo cuando se modifique una actividad creada por él*/
    checkPermissions(req.user, activity.user_id)

    const updateActivity = await Activity.findOneAndUpdate({ _id: activityId }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(StatusCodes.OK).json({ updateActivity })
}



export { createActivity, deleteActivity, getAllActivities, updateActivity, }

