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

const updateEvent = (req = request, res = response) => {
    
    

    return res.status(200).json({
        ok: true,
        msg: 'eventos | PUT'
    })
}

const deleteEvent = (req = request, res = response) => {
    


    return res.status(200).json({
        ok: true, 
        msg: 'event | DELETE'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}