const mongoose = require('mongoose')
require('dotenv').config();

const DATABASE = process.env.DB_CNN

const dbConnection = async () => {
    try {
        await mongoose.connect(DATABASE, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database is connected');
    } catch (error) {
        console.log(error);
        throw new Error('Error inicializando base de datos')
    }
}

module.exports = {
    dbConnection
}