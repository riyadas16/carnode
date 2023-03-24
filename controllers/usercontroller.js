const user = require('../models/usermodel')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const signtoken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}
exports.signup = async (req, res, next) => {
    const newuser = await user.create(req.body)
    // const token = await signtoken(newuser._id)
    res.status(200).json({ newuser })
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(403).send("please enter a valid email and password")
    }
    const loginuser = await user.findOne({ email }).select('+password')


    if (!loginuser || !(await loginuser.correctPassword(password, loginuser.password))) {
        return res.status(403).send("Incorrect email or password")
    }

    // console.log(user._id)
    const token = signtoken(loginuser._id)
    res.status(201).json({ token })

}

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next("you must be logged in first!")
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    //console.log(decoded)

    //user ko delete kerdiya toh phir token ka kya faida
    const currentuser = await user.findById(decoded.id)
    if (!currentuser) {
        return res.status(403).send("the user does not exist")
    }

    //agar user ne password change kiya toh 
    // if(currentuser.changedPasswordAfter(decoded.iat)){
    //     return res.send('user recently changed password')
    // }
    req.user = currentuser;
    // req.body.userId = currentuser._id
    next()
}
