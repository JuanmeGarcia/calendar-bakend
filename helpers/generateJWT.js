const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        const seed = process.env.SECRET_JWT_SEED

        jwt.sign(
            payload,
            seed, 
            {
                expiresIn: '2h'
            },
            (error, token)=>{
                if(error){
                    console.log(error);
                    reject('No se pudo generar correctamente el token')
                }
                resolve(token)
        })
    })
}


module.exports = {
    generateJWT
}