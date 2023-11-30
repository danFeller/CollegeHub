const {ApolloServer} = require('apollo-server-koa')
const {federatedSchema} = require("./graphql");

// Intialize the Apollo GraphQL Server
const server = new ApolloServer({
    schema: federatedSchema,
    cache: 'bounded',
    dataSources: () => ({}),
    introspection: true
})

module.exports = {
    apolloServer: server
}