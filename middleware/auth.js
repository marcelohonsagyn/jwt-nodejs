const {UnAuthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthenticatedError('Please, provide a Authentication Token')
    }

    const tokenValue = authHeader.split(' ')[1]
    console.log(tokenValue);
    try {
        console.log('Verifing Token');
        const decoded = verifyToken(tokenValue)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    } catch (error) {
        console.log(error);
    }

}

const verifyToken = (token) => {
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Your token is valid!');
        return decoded
    } catch (error) {
        console.log(error);
        throw new UnAuthenticatedError('Please, provide a Authentication Token')
    }
}

module.exports = authenticationMiddleware