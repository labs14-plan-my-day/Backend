
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {user_id: '1', name: 'test',status: 2, date: 'jan 1', start_time: '3:00',end_time:'4:00', description: 'test desc', importance: 2, bookmark: false, alert: false},
        
        {user_id: '1', name: 'check emails',status: 2, date: 'jan 1', start_time: '3:00', end_time:'4:00', description: 'test desc', importance: 2, bookmark: false, alert: false}
      ]);
    });
};
