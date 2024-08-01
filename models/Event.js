const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Event = db.define('Event', {
    title:{
        type: DataTypes.STRING,
        required: true
    },
    description: {
        type: DataTypes.STRING,
        required: true
    },
    data: {
        type: DataTypes.DATEONLY,
        required: true
    },
    hora: {
        type: DataTypes.TIME,
        required: true
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        required: true
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    city: {
        type: DataTypes.STRING,
        required: true
    },
    location: {
        type: DataTypes.STRING,
        required: true
    }
})
module.exports = Event;