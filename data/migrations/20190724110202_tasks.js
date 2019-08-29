
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tasks', tbl =>{
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('PMD-users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');

        tbl.string('name', 200).notNullable()
        tbl.integer('status').defaultTo(1).notNullable();
        tbl.string('date').notNullable()
        tbl.string('start_time', 128).notNullable();
        tbl.string('end_time', 128).notNullable();
        tbl.text('description',300);
        tbl.integer('importance', 128).defaultTo(2).notNullable();
        tbl.boolean('bookmark').defaultTo(false).notNullable();
        tbl.boolean('alert').defaultTo(false).notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tasks')
  };
  