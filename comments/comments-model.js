const db = require('../data/dbConfig.js')

module.exports = {
    find ,
    add,
    remove
}

function find(){
    return db('comments')
}

function add(task) {
    return db("tasks").insert(task);
  }
  

  function remove(id) {
    return db("tasks")
      .where({ id })
      .del();
  }

  function findByTaskId(taskId) {
    return db("comments as c")
        .join("tasks as t", "t.id", "=", "c.task_id")
        .select(
            "c.id",
            "c.task_id",
            "c.commentor",
            "c.comment",
            "c.date",
        )
        .where({ "t.id": taskId })
        .distinct("c.id")
        .orderBy("c.id");
}
