const {ApolloServer} = require('apollo-server-koa')
const {federatedSchema} = require("./graphql");
const serviceAPI = require('./service/serviceAPI')

// Intialize the Apollo GraphQL Server
const server = new ApolloServer({
    schema: federatedSchema,
    cache: 'bounded',
    dataSources: () => ({ serviceAPI }),
    introspection: true,
    context: async ({ ctx = {} }) => {
        ctx.request = ctx.request || {}
        ctx.request.header = ctx.request.header || {}
        return { ctx }
    }
})

module.exports = {
    apolloServer: server
}