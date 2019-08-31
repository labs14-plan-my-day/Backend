const db = require('../data/dbConfig.js')

module.exports = {
    add, find, findBy, findByEmail, remove,update
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
    return db('PMD-users').where({ email }).first()
}

function update(id, changes) {
    return db("PMD-users")
      .where({ id })
      .update(changes);
  }