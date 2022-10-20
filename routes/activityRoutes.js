import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'

import {
    createActivity,
    deleteActivity,
    getAllActivities,
    updateActivity,
} from '../controllers/activitiesController.js'

router.route('/').get(getAllActivities).post(authenticateUser, createActivity)
router.route('/:id').delete(authenticateUser, deleteActivity).patch(authenticateUser, updateActivity)

export default router