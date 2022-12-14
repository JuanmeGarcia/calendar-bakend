const { response, request, json } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateJWT =  (req = request, res = response, next) => {
    
    // x-token en los headers 

    const token = req.header('x-token')
    const JWT_SEED = process.env.SECRET_JWT_SEED

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Falta el token en la peticion'
        })
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            JWT_SEED
        ) 

        req.uid = uid
        req.name = name
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token invalido'
        })
    }

    next()
}







module.exports = {
    validateJWT
}