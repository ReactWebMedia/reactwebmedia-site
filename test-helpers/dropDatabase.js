import knexLib from 'knex';
import config from '../knexfile';


config.test.connection.database = 'reactwebmedia';
let knex = knexLib(config.test);

async function run() {
  await knex.raw('DROP DATABASE IF EXISTS reactwebmedia_test;');
  await knex.raw('CREATE DATABASE reactwebmedia_test;');
}

run()
  .then(function() {
    knex.destroy();
    process.exit(0);
  })
  .catch(e => {
    console.log(e);
    knex.destroy();
    process.exit(1);
  });
