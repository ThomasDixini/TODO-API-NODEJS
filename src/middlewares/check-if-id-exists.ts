import { FastifyReply, FastifyRequest } from "fastify";
import { k } from "../database/config";
import { UUID } from "crypto";

export async function checkIdExists(req: FastifyRequest, reply: FastifyReply) {
  const id = req.params as UUID;
  const taskExist = await k("tasks").select("*").where(id).first();

  if (!taskExist) {
    return reply.status(404).send({
      message: "Task not found, Nonexistent ID",
    });
  }
}
