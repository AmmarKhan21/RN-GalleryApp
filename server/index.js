const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const PORT = 4000;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async () => ({}),
  });

  console.log(`\n🚀 Image Gallery GraphQL Server running at: ${url}`);
  console.log(`   Open http://localhost:${PORT} to explore the API\n`);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
