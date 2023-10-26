import { UUID, randomUUID } from "crypto";
import { FastifyRequest, FastifyInstance, FastifyReply } from "fastify";
import { k } from "../database/config";
import { checkIdExists } from "../middlewares/check-if-id-exists";
import { checkBodyExist } from "../middlewares/check-body-exist";

interface Task {
  id: UUID;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  finished_at?: Date;
}

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const { title, description } = req.body as Task;

    const task: Task = {
      id: randomUUID(),
      title,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await k("tasks").insert(task);

    return reply.status(201).send("Task created successfully");
  });

  app.get(
    "/",
    { preHandler: [checkBodyExist] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { title, description } = req.query as Task;

      if (title && description) {
        const tasks = await k
          .select("*")
          .from("tasks")
          .whereILike("title", `%${title}%`)
          .andWhereILike("description", `%${description}%`);

        reply.status(200).send({
          message: "Task listed successfully",
          tasks,
        });
      }

      const tasks = await k.select("*").from("tasks");
      return (
        reply.status(200),
        {
          message: "Tasks listed successfully",
          tasks,
        }
      );
    },
  );

  app.put(
    "/:id",
    { preHandler: [checkIdExists, checkBodyExist] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const id = req.params as UUID;
      const { title, description } = req.query as Task;

      if (title && description) {
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
        message:
          "The return is 'ok' but the task dont have anything for update",
      });
    },
  );

  app.delete(
    "/:id",
    { preHandler: [checkIdExists] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const id = req.params as UUID;
      await k("tasks").where(id).delete();

      return reply.status(200).send({
        message: "Task deleted successfully",
      });
    },
  );

  app.patch(
    "/:id/complete",
    { preHandler: [checkIdExists] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const id = req.params as UUID;
      const isComplete = await k("tasks")
        .where(id)
        .whereNotNull("finished_at")
        .select("finished_at")
        .first();

      if (isComplete != null) {
        await k("tasks").where(id).update({
          finished_at: null,
        });
        return reply.status(200).send({ message: "Task reinicialized" });
      }

      await k("tasks").where(id).update({
        finished_at: new Date(),
      });

      return reply.status(200).send({
        message: "Task has been marked as complete successfully",
      });
    },
  );
}
