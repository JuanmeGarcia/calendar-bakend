const { request, response } = require('express')
const Event = require('../models/Event')

const getEvents = async (req = request, res = response) => {
    
    const events = await Event.find() 
                                .populate('user', ['name', 'email'])

    return res.status(200).json({
        ok: true,
        events
    })
}

const createEvent = async (req = request, res = response) => {
    
    //verificar q tenga el evento
    console.log(req.body);

    try {
        const event = new Event(req.body)

        event.user = req.uid

        const savedEvent = await event.save() 

        return res.status(201).json({
            ok: true,
            event: savedEvent
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquse con el admin'
        })
    }
}

const updateEvent = async (req = request, res = response) => {
    
    
    try {
        const { id } = req.params
        
        const event = await Event.findById(id)
        const { uid } = req

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Este evento no existe'
            })
        }

        if(event.user.toString() != uid){
            return res.status(401).json({
                ok: false, 
                msg: 'Usted no esta autorizado a realizar modificaciones a este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            newEvent,
            {new: true}
        )

        return res.status(200).json({
            ok: true,
            msg: 'Evento actualizado',
            updatedEvent
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteEvent = async (req = request, res = response) => {
    try {
        const { id } = req.params
        
        const event = await Event.findById(id)
        const { uid } = req

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Este evento no existe'
            })
        }

        if(event.user.toString() != uid){
            return res.status(401).json({
                ok: false, 
                msg: 'Usted no esta autorizado a realizar modificaciones a este evento'
            })
        }

        const deletedEvent = await Event.findByIdAndDelete(id) 

        return res.status(200).json({
            ok: true,
            msg: 'Evento eliminado',
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}