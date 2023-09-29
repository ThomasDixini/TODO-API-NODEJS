import { UUID, randomUUID } from "crypto";
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
    const { title, description } = req.query as Task;

    if (title || description) {
      const tasks = await k
        .select("*")
        .from("tasks")
        .whereILike("title", `%${title}%`)
        .orWhereILike("description", `%${description}%`);

      reply.status(200).send({
        message: "Task created successfully",
        tasks,
      });
    }

    const tasks = await k.select("*").from("tasks");
    return (
      reply.status(200),
      {
        message: "Task listed successfully",
        tasks,
      }
    );
  });

  app.put("/:id", async (req: FastifyRequest, reply: FastifyReply) => {
    const id = req.params as UUID;
    const { title, description } = req.query as Task;

    if (title || description) {
      await k("tasks").where(id).update({
        title,
        description,
        updated_at: new Date(),
      });

      return reply.status(200).send({
        message: "Task updated successfully",
      });
    }

    return reply.status(200).send({
      message: "The return is 'ok' but the task dont have anything for update",
    });
  });
  app.delete("/:id", async (req: FastifyRequest, reply: FastifyReply) => {
    const id = req.params as UUID;
    await k("tasks").where(id).delete();

    return reply.status(200).send({
      message: "Task deleted successfully",
    });
  });
}
