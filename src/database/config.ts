import knex, { Knex } from "knex";
import "dotenv/config";

const NODE_ENV = process.env.NODE_ENV;

export const config: Knex.Config = {
  client: NODE_ENV === "development" ? "mysql2" : "sqlite",
  connection:
    NODE_ENV === "development"
      ? {
          host: "127.0.0.1",
          port: 3301,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
        }
      : {
          filename: "./app.db",
        },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations",
  },
};

export const k = knex(config);
