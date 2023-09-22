import { type FastifyInstance } from "fastify";

export async function tasksRoutes(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    return reply.status(200).send("Hello world!");
  });
}
