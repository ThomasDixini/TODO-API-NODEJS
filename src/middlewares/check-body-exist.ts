import { FastifyReply, FastifyRequest } from "fastify";

interface TaskQuery {
  title: string;
  description: string;
}

export function checkBodyExist(req: FastifyRequest, reply: FastifyReply) {
  const { title, description } = req.query as TaskQuery;

  if (!title || !description) {
    return reply.status(404).send({
      message: "Both fields are required",
    });
  }
}
