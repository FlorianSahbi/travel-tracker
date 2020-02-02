const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./orm/generated/prisma-client/index");
const Query = require("./graphql/resolvers/Query");
const Mutation = require("./graphql/resolvers/Mutation");
const Marker = require("./graphql/resolvers/Marker");
const Subscription = require('./graphql/resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Marker
}

const options = {
  port: 5000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const server = new GraphQLServer({
  typeDefs: './graphql/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  }
})

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)
