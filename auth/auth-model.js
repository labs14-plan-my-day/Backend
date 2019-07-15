const db = require('../data/dbConfig.js')

module.exports = {
    add,find
}

function find() {
    return db('PMD-users')
}

function add(user){
    return db('PMD-users').insert(user)
}