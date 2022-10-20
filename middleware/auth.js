import { UnAuthenticatedError } from "../errors/index.js"
import jwt from 'jsonwebtoken'
import User from "../models/User.js"

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnAuthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = { userId: payload.userId }
        const { role } = await User.findOne({ _id: payload.userId })
        req.user.role = role 
        next()
    } catch (error) {
        throw new UnAuthenticatedError('Authentication invalid')
    }
}

export default auth