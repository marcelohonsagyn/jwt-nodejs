const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        throw new BadRequestError('Please, provide a email and password')
    }

    const id = new Date().getDate()

    //try to keep payload small, is a better experience for user
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})

    console.log(password, username)
    res.status(200).json({msg: 'user created', token})
}

const dashBoard = async (req, res) => {
    console.log('Creating lucky number');
    console.log(req.user);
    const luckNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: ` Hello, ${req.user.username}`, 
                           secret: `Here is your authorized data, your lucky number is ${luckNumber}` })

}



module.exports = {login, dashBoard}