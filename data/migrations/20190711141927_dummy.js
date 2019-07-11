
exports.up = function(knex) {
    return knex.schema.createTable('dummy', t =>{
        t.increments();
        t.string('name', 100).notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('dummy')
};
