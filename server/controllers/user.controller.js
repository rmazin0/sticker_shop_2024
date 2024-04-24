import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const userToken = jwt.sign(
            {userId:newUser._id, username:newUser.username, isAdmin:newUser.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn:'2h'}
            )
        res.cookie('userToken', userToken, {httpOnly:true, maxAge: 2*60*60*1000})
        return res.status(201).json(newUser)
    } catch (err) {
        console.log('ERROR', err);
        return res.status(500).json(err)
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body // deconstruct username and pass from req.body
    const potentialUser = await User.findOne({username:username}) // finds potential user by their username
    if (!potentialUser) {
        return res.status(404).json({message:'user not found'});
    }
    //if we pass the first condition, compares the password of given username
    const potentialPass = await bcrypt.compare(password, potentialUser.password)
    if (!potentialPass){
        return res.status(400).json({message:'Invalid Credentials'});
    }
    // after password checks, create a userToken for the user
    const userToken = jwt.sign(
        {userId:potentialUser._id, username:potentialUser.username, isAdmin:potentialUser.isAdmin},
        process.env.SECRET_KEY,
        {expiresIn:'2h'}
        )
    res.cookie('userToken', userToken, {httpOnly:true, maxAge: 2*60*60*1000})
    return res.status(201).json(potentialUser)
}

export const logout = async (req, res) => {
    res.clearCookie('userToken')
    return res.status(200).json({message:'Logged out!'})
}

//get logged in user by id
export const getLoggedUser = async (req, res) => {
    try {
        const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true})
        const userId = decodedJwt.payload.userId
        const loggedUser = await User.findById(userId)
        // console.log(loggedUser);
        return res.status(200).json(loggedUser)
    } catch (err) {
        return res.status(500).json(err)
    }
}
