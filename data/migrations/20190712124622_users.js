exports.up = function(knex) {
    return knex.schema.createTable('PMD-users', users => {
      users.increments();
      users
        .string('email', 128)
        .notNullable()
        .unique();
      users.string('username', 128).notNullable();
      users.boolean('is_admin').defaultTo(false).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('PMD-users');
  };