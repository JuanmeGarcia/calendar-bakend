/* 
    Rutas de usuarios / auth

    host + api/auth
*/
const { Router } = require('express')
const { createUser, loginUser, revalidateToken  } = require('../controllers/auth')
const { check } = require('express-validator')
const { fieldValidators } = require('../middlewares/fieldValidators')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

// router.get('/', (req, res) => {
//     res.json({
//         sexo: 'mucho'
//     })
// })

router.post(
    '/',
    [
        check(
            'email',
            'El email es obligatorio'
        )
            .not()
            .isEmpty(),

        check(
            'email',
            'El email debe tener un formato correcto'
        )
            .isEmail(),
        
        check(
            'password',
            'El password debe tener minimamente 6 y maximo 24 caracteres'
        )
            .isLength({
                min: 6,
                max: 24
            }),
        fieldValidators
    ],
    loginUser
)

router.post(
    '/new',
    [
        check(
            'name', 
            'El nombre es obligatorio'
        )
            .not()
            .isEmpty(),

        check(
            'email',
            'El email es obligatorio'
        )
            .not()
            .isEmpty(),

        check(
            'email',
            'El email debe tener un formato correcto'
        )
            .isEmail(),

        check(
            'password',
            'El password debe tener minimamente 6 caracteres y maximo 24'
        )
            .isLength({
                min: 6,
                max: 24
            }),
        fieldValidators
    ],
    createUser)

router.get(
    '/renew',
    [
        validateJWT
    ],
    revalidateToken
)

module.exports = router