const db = require('../data/dbConfig.js')

module.exports = {
    add, find, findBy
}

function find() {
    return db('PMD-users')
}

function add(user) {
    return db('PMD-users').insert(user)
}

function findBy(id) {
    return db('PMD-users').where({ username: id }).first()
}