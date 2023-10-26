import { randomUUID } from "crypto";
import supertest from "supertest";
import { app } from "../server/server";

import { describe, test } from "vitest";

const request = supertest;

describe("Tasks test", () => {
  test("should create a task", async () => {
    await request(app.server)
      .post("/tasks")
      .send({
        id: randomUUID(),
        title: "Testando",
        description: "Descrição da tarefa",
        created_at: new Date(),
        updated_at: new Date(),
      })
      .expect(201);
  });
});
