import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import checkPermissions from "../utils/checkPermissions.js"
import Activity from "../models/Activity.js"

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values')
    }

    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }

    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name,
            role: user.role
        },
        token,
        location: user.location
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new UnAuthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid credentials')
    }

    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const getAllUsers = async (req, res) => {

    checkPermissions(req.user, null)

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const users = await User.find({}).skip(skip).limit(limit)

    const total = await User.countDocuments({})
    const numOfPages = Math.ceil(total / limit)

    res.status(StatusCodes.OK).json({
        users,
        total,
        numOfPages
    })
}

const deleteUser = async (req, res) => {

    const { id: userId } = req.params
    const user = await User.findOne({ _id: userId })

    if (!user) {
        throw new NotFoundError(`No user with id: ${userId}`)
    }

    checkPermissions(req.user, null)
    await Activity.deleteMany({ user_id: userId });
    await user.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body

    if (!email || !name || !lastName || !location) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ _id: req.user.userId })


    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location
    
    await user.save()

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const editUser = async (req, res) => {
    const { id: userId } = req.params
    const {
        name,
        role,
        email,
        lastName,
        location
    } = req.body
    if (!name || !role || !lastName || !email || !location) {
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ _id: userId })

    if (!user) {
        throw new NotFoundError(`No user with id ${userId}`)
    }

    checkPermissions(req.user, null)

    const updateUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(StatusCodes.OK).json({ updateUser })
}
export {
    register,
    login,
    updateUser,
    getAllUsers,
    deleteUser,
    editUser
}

