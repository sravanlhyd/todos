const jwt = require('jsonwebtoken')
const User = require('../model/user')
require('dotenv').config()

const auth = async(req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'token': token })
        if (!user) {
            throw new Error()
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth