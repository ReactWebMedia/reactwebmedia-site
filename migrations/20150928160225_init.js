
exports.up = async function(knex, Promise) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS pgcrypto');

  await knex.schema.createTable('users', function(table) {
    table.uuid('id').primary();
    table.text('username').unique();
    table.text('hashed_password');
    table.text('email').unique();
    table.timestamp('created_at', true).defaultTo(knex.raw('now()'));
    table.timestamp('updated_at', true).defaultTo(knex.raw('now()'));
    table.json('more', true);
  });
};

exports.down = async function(knex, Promise) {
  return knex.schema.dropTable('users');
};
