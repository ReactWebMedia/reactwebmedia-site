CREATE EXTENSION pgcrypto;

\set prefix `echo $PG_PREFIX`

CREATE TABLE users (
  id uuid not null unique PRIMARY KEY,
  username text not null unique,
  hashed_password text not null,
  email text not null unique,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  more jsonb
);