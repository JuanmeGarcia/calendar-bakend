const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config()
const cors = require('cors')

//crear servidor de express
const app = express()

//base de datos

dbConnection()

// CORS

app.use(cors()) 

//directorio publico

app.use(express.static('public'))

//lectura y parseo del body

app.use(express.json())


//rutas

// app.get('/', (req, res) =>{
//     res.json({
//         sexo: 'mucho'
//     })
// })
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
//TODO crud => eventos


//escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})