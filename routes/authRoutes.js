import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, 
    max: 10,
    message: 'Too many request from this IP address, please try again after 15 minutes'
})



import authenticateUser from '../middleware/auth.js'
import {
    register,
    login,
    updateUser,
    getAllUsers,
    deleteUser,
    editUser
} from '../controllers/authController.js'

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/updateUser').patch(authenticateUser, updateUser)

router.route('/').get(authenticateUser, getAllUsers)
router.route('/:id').delete(authenticateUser, deleteUser)
router.route('/:id').patch(authenticateUser, editUser)



export default router