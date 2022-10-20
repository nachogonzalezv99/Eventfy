import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'

import {
    createEvent,
    deleteEvent,
    getAllEvents,
    updateEvent,
} from '../controllers/eventsController.js'

router.route('/').get(getAllEvents).post(authenticateUser, createEvent)
router.route('/:id').delete(authenticateUser, deleteEvent).patch(authenticateUser, updateEvent)

export default router