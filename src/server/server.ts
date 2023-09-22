import fastify from "fastify";
import { tasksRoutes } from "../tasksRoutes/tasksRoutes";

const app = fastify();

app.register(tasksRoutes, {
  prefix: "/tasks",
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server listening on port 3333");
});
