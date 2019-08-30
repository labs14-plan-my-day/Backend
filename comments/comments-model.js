const db = require('../data/dbConfig.js')

module.exports = {
    find ,
    add,
    remove,
    findByTaskId
}

function find(){
    return db('comments')
}

function add(task) {
    return db("comments").insert(task);
  }
  

  function remove(id) {
    return db("comments")
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
