const jwt = require("jsonwebtoken")
const SECRET_KEY = require('../credentials')
module.exports = authenticate = (req, res, next)=>{
    
    let token = req.headers.authorization
    
    let payload = jwt.verify(token, SECRET_KEY)

    if(!payload){
        return res.send(401)
    }
    req.userEmail = payload.email
    next()
}