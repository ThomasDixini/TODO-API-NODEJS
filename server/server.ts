import fastify from 'fastify'

const app = fastify({
  logger: true,
})

app.listen({ port: 3333 }, () => {
  console.log('HTTP server listening on port 3333')
})
