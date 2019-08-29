const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findByUserId,
    remove
}

function find() {
    return db('history')
}

function findByUserId(userId) {
    return db("history as h")
        .join("PMD-users as u", "u.id", "=", "h.user_id")
        .select(
            "h.id",
            "h.user_id",
            "h.name",
            "h.status",
            "h.date",
            "h.start_time",
            "h.end_time",
            "h.description",
            "h.importance",
            "h.bookmark",
            "h.alert"
        )
        .where({ "u.id": userId })
        .distinct("h.id")
        .orderBy("h.id");
}

function remove(id) {
    return db("history")
        .where({ id })
        .del();
}


