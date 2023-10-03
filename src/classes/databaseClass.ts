import { UUID } from "crypto";
import { k } from "../database/config";

export interface Task {
  id: UUID;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  finished_at?: Date;
}

export class Database {
  _database: string;
  _table: string;

  constructor(database: string, table: string) {
    this._database = database;
    this._table = table;
    this.validate();
  }

  validate() {
    if (!this._database) {
      throw new Error("Database not defined");
    }
    if (!this._table) {
      throw new Error("Table not defined");
    }
  }

  async insertInto(task: Task): Promise<void> {
    return await k.insert(task).into(this._table);
  }
}

export const db = new Database("dev_database", "tasks");
