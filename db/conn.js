const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('eventsnodejs','root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectamos com o MySQL')
} catch(err){
    console.log('Não foi possível conectar: ', err)
}

module.exports = sequelize;