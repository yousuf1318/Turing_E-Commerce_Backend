const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'yousuf456',
      database: 'turing'
    }
  });

  module.exports = knex