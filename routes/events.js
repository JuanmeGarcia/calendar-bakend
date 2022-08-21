/* 
    Rutas de usuarios / events

    host + api/events
*/


const { Router } = require('express')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { validateJWT } = require('../middlewares/validateJWT')
const { check } = require('express-validator')
const { fieldValidators } = require('../middlewares/fieldValidators')
const { isDate } = require('../helpers/isDate')


const router = Router()

//Todas tienen que pasar la validacion del JWT
//Se le pasa el middleware para proteger las rutas a todos
// los endpoints
router.use(validateJWT)

router.get(
    '/',
    getEvents
)

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        fieldValidators
    ],
    createEvent
)

router.put(
    '/:id',
    updateEvent
)

router.delete(
    '/:id',
    deleteEvent
)

module.exports = router