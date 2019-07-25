
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('PMD-users').del()
    .then(function () {
      // Inserts seed entries
      return knex('PMD-users').insert([
        {id: 1, username: 'test', password: 'test', is_admin: false},
        {username: 'admin', password: '$2a$04$wcBoZnqQKhUC86PhxZ5rSOJUFOaIZlZttmXR2zNzIGpJk4MyNih4e', is_admin: 1},

      ]);
    });
};
