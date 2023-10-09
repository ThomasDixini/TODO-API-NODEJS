import knex, { Knex } from "knex";
import "dotenv/config";

export const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3301,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations",
  },
};

export const k = knex(config);
