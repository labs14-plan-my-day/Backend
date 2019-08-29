const db = require('../data/dbConfig.js')

module.exports = {
    find, findByUserId, add, remove

}

function find() {
    return db('bookmarks')
}

function findByUserId(userId) {
    return db("bookmarks as b")
        .join("PMD-users as u", "u.id", "=", "b.user_id")
        .select(
            "b.id",
            "b.user_id",
            "b.name",
            "b.status",
            "b.date",
            "b.start_time",
            "b.end_time",
            "b.description",
            "b.importance",
            "b.bookmark",
            "b.alert"
        )
        .where({ "u.id": userId })
        .distinct("b.id")
        .orderBy("b.id");
}

function add(bookmark) {
    return db("bookmarks").insert(bookmark);
}

function remove(id) {
    return db("bookmarks")
        .where({ id })
        .del();
}