
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dummy').del()
    .then(function () {
      // Inserts seed entries
      return knex('dummy').insert([
        {name: 'check emails'},
        {name: 'work on app'},
        {name: 'finish app'}
      ]);
    });
};
