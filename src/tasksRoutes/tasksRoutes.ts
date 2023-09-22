import { randomUUID } from "crypto";
import { FastifyRequest, FastifyInstance, FastifyReply } from "fastify";
import { k } from "../database/config";
interface Task {
  title: string;
  description: string;
}

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const { title, description } = req.body as Task;

    await k
      .insert({
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .into("tasks");

    return reply.status(201).send("Task created successfully");
  });

  app.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const tasks = await k.select("*").from("tasks");

    return (
      reply.status(200),
      {
        message: "Task listed successfully",
        tasks,
      }
    );
  });
}
