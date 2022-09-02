const { options } = require('./sqlite3/conexionDB')

const knex = require('knex')(options)


const crearTabla = async (nombreTabla) => {
    try{
        await knex.schema.createTable(nombreTabla, table => {
            table.increments('id')
            table.timestamp('fecha').defaultTo(knex.fn.now())
            table.string('email')
            table.string('mensaje')
        })
        console.log('tabla creada')
    }catch(err){
        console.log(err)
    }
}

// knex.schema.createTable('user', (table) => {
//     table.increments('id')
//     table.string('name')
//     table.integer('age')
// })
//     .then(() => { console.log('tabla creada') })
//     .catch((err) => { console.log(err); throw err })
//     .finally(() => { console.log })


// crearTabla('mensajes');

exports.module = {crearTabla};