import knex, { Knex } from "knex";

export const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3301,
    user: "root",
    password: "secret",
    database: "dev_database",
  },
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations",
  },
};

export const k = knex(config);
