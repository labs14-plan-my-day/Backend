
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('PMD-users').del()
    .then(function () {
      // Inserts seed entries
      return knex('PMD-users').insert([
        {id: 1, email:'test@test.com',username: 'test',is_admin: false},
        {email:'tommyexar@gmail.com', username: 'admin', is_admin: 1},

      ]);
    });
};
