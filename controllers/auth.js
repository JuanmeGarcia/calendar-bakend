const { response, request } = require('express')
const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/generateJWT')

const loginUser = async (req = request, res = response) => {
    
    try {
        const { email, password } = req.body

        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'No existe ese usuario con ese email y/o contrasenia'
            })
        }
        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'No existe ese usuario con ese email y/o contrasenia'
            })
        }

        //generar JWT
        const token = await generateJWT(user.id, user.name)
    
        res.status(201).json({
            ok: true,
            login: 'success',
            uid: user.id,
            name: user.name,
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
} 

const createUser = async (req = request, res = response) => {
    const { name, email, password } = req.body


    try {
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            })
        }
        user = new User({name, email, password})

        //encriptar contrasenia

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //generar JWT
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, comuniquese con el admin'
        })
    }

    // if(name.length < 5){
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'El nombre debe tener minimamente 5 caracteres'
    //     })
    // }
    //manejo de errores
}

const revalidateToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew',
    })
}

module.exports = {
    loginUser,
    createUser,
    revalidateToken
}