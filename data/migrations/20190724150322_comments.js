
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', tbl =>{
        tbl.increments();
        tbl
          .integer('task_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('tasks')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');

        tbl.string('commentor', 200).notNullable();
        tbl.text('comment', 300).notNullable();
        tbl.date("date", 30).defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments')
  };
  