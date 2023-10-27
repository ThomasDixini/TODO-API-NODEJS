import { randomUUID } from "crypto";
import supertest from "supertest";
import { app } from "../server/server";

import { beforeEach, describe, expect, test } from "vitest";
import { k } from "../database/config";

beforeEach(async () => {
  await k("tasks").delete("*");
});

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

  test("should be get list of tasks", async () => {
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

    const response = await request(app.server)
      .get("/tasks")
      .set("Content-Type", "application/json");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBe(response.body);
  });

  test("should be possible update a task", async () => {
    const title = "Testando";
    const description = "Descrição da tarefa";

    await k("tasks").insert({
      id: "1234",
      title,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await request(app.server)
      .put(`/tasks/1234`)
      .send({
        title: "Novo titulo",
        description: "Nova Descrição",
      })
      .expect(200);
  });
});
