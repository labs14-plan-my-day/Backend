const db = require('../data/dbConfig.js')

module.exports = {
    add, find, findBy, findByEmail, remove
}

function find() {
    return db('PMD-users')
}

function add(user) {
    return db('PMD-users').insert(user)
}

function findBy(id) {
    return db('PMD-users').where({ id }).first()
}


function remove(id) {
    return db('PMD-users')
        .where({ id })
        .del();
}

function findByEmail(email){
    return db('PMD-users').where({email:email}).first()
}