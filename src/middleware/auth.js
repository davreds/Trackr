const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

if ( process.env.NODE_ENV === 'production') {
    var secret = process.env.secret
} else {
    const config = require('../config')
    var secret = config.secret
}

const auth = function(req,res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, secret)
        User.findOne({ _id: decoded.id, 'tokens.token': token}).then(function(user){
            if(!user){
                throw new Error()
            }
            req.token = tokens
            req.user = user
            next()
        }).catch(function(error){
            res.status(401).send({ error: 'Required user authentication.'})
        })
    } catch(e) {
        res.status(401).send({ error: 'Required user authentication.'})
    }
}

module.exports = auth
