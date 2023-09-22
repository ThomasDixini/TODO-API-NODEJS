import { randomUUID } from "crypto";
import { FastifyRequest, FastifyInstance, FastifyReply } from "fastify";
interface Task {
  title: string;
  description: string;
}

const fakeDB: Task[] = [];

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const { title, description } = req.body as Task;

    const task = {
      id: randomUUID(),
      title,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    };
    fakeDB.push(task);
    return reply.status(201).send("Task created successfully");
  });

  app.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    return (
      reply.status(200),
      {
        message: "Task listed successfully",
        fakeDB,
      }
    );
  });
}