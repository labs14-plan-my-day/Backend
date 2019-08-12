const db = require('../data/dbConfig.js')

module.exports = {
    find,
    add,
    findById,
    findByUserId,
    remove,
    update,
    findCommentById
}

function find(){
    return db('tasks')
}


function findByUserId(userId) {
    return db("tasks as t")
      .join("PMD-users as u", "u.id", "=", "t.user_id")
      .select(
        "t.id",
        "t.user_id",
        "t.name",
        "t.status",
        "t.date",
        "t.start_time",
        "t.end_time",
        "t.description",
        "t.importance",
        "t.bookmark",
        "t.alert"
      )
      .where({ "u.id": userId })
      .distinct("t.id")
      .orderBy("t.id");
  }
  
  function add(task) {
    return db("tasks").insert(task);
  }
  
  function update(id, changes) {
    return db("tasks")
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db("tasks")
      .where({ id })
      .del();
  }
  
  function findById(id) {
    return db("tasks")
      .where({ id })
      .first();
  }

  function findCommentById(taskId) {
    return db("tasks as t")
      .join("comments as c", "t.id", "=", "c.task_id")
      .select(
        "c.id",
        "c.commentor",
        "c.comment",
        "c.date"
      )
      .where({ "t.id": taskId })
      .distinct("c.id")
      .orderBy("c.id");
  }